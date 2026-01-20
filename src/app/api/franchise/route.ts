import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, region, message } = body;

    // Validate required fields
    if (!name || !phone || !region) {
      return NextResponse.json(
        { error: "필수 항목을 모두 입력해주세요." },
        { status: 400 }
      );
    }

    // Save to Supabase
    const supabase = createServerSupabaseClient();
    const { data, error: dbError } = await supabase
      .from("franchise_inquiries")
      .insert({
        name,
        phone,
        region,
        message: message || "",
        status: "pending",
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json(
        { error: "문의 저장 중 오류가 발생했습니다." },
        { status: 500 }
      );
    }

    // Send email notification
    const adminEmail = process.env.ADMIN_EMAIL;
    const resendApiKey = process.env.RESEND_API_KEY;
    if (adminEmail && resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        await resend.emails.send({
          from: "Scoops Gelato <onboarding@resend.dev>",
          to: adminEmail,
          subject: `[스쿱스 젤라또] 새 가맹문의: ${name}님`,
          html: `
            <h2>새로운 가맹문의가 접수되었습니다</h2>
            <table style="border-collapse: collapse; width: 100%; max-width: 500px;">
              <tr>
                <td style="padding: 8px; border: 1px solid #ddd; background: #f5f5f5;"><strong>이름</strong></td>
                <td style="padding: 8px; border: 1px solid #ddd;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border: 1px solid #ddd; background: #f5f5f5;"><strong>연락처</strong></td>
                <td style="padding: 8px; border: 1px solid #ddd;">${phone}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border: 1px solid #ddd; background: #f5f5f5;"><strong>희망 지역</strong></td>
                <td style="padding: 8px; border: 1px solid #ddd;">${region}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border: 1px solid #ddd; background: #f5f5f5;"><strong>문의 내용</strong></td>
                <td style="padding: 8px; border: 1px solid #ddd;">${message || "-"}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border: 1px solid #ddd; background: #f5f5f5;"><strong>접수 시간</strong></td>
                <td style="padding: 8px; border: 1px solid #ddd;">${new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })}</td>
              </tr>
            </table>
            <p style="margin-top: 20px;">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL || ""}/admin/inquiries"
                 style="background: #111; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                관리자 페이지에서 확인하기
              </a>
            </p>
          `,
        });
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json({
      success: true,
      message: "문의가 성공적으로 접수되었습니다.",
      data,
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
