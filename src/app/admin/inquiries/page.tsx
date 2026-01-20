"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Phone, MapPin, MessageSquare, ChevronLeft, ChevronRight } from "lucide-react";
import { createBrowserSupabaseClient, FranchiseInquiry } from "@/lib/supabase";
import AdminHeader from "@/components/AdminHeader";

export const dynamic = "force-dynamic";

const statusLabels: Record<string, { label: string; className: string }> = {
  pending: {
    label: "대기",
    className: "bg-yellow-100 text-yellow-800",
  },
  contacted: {
    label: "연락완료",
    className: "bg-blue-100 text-blue-800",
  },
  completed: {
    label: "완료",
    className: "bg-emerald-100 text-emerald-800",
  },
};

const PAGE_SIZE_OPTIONS = [10, 20, 50];

export default function AdminInquiriesPage() {
  const router = useRouter();
  const [inquiries, setInquiries] = useState<FranchiseInquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // 페이징 상태
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  // 통계용 상태 (전체 데이터 기준)
  const [stats, setStats] = useState({ total: 0, pending: 0, completed: 0 });

  // Supabase 클라이언트 메모이제이션
  const supabase = useMemo(() => createBrowserSupabaseClient(), []);

  // 통계 데이터 조회 (전체 데이터 기준)
  const fetchStats = useCallback(async () => {
    const { count: total } = await supabase
      .from("franchise_inquiries")
      .select("*", { count: "exact", head: true });

    const { count: pending } = await supabase
      .from("franchise_inquiries")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending");

    const { count: completed } = await supabase
      .from("franchise_inquiries")
      .select("*", { count: "exact", head: true })
      .eq("status", "completed");

    setStats({
      total: total || 0,
      pending: pending || 0,
      completed: completed || 0,
    });
  }, [supabase]);

  // 페이징된 데이터 조회
  const fetchInquiries = useCallback(async () => {
    setIsRefreshing(true);

    const from = (currentPage - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, count, error } = await supabase
      .from("franchise_inquiries")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) {
      console.error("Error fetching inquiries:", error);
    } else {
      setInquiries(data || []);
      setTotalCount(count || 0);
    }
    setIsLoading(false);
    setIsRefreshing(false);
  }, [supabase, currentPage, pageSize]);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from("franchise_inquiries")
      .update({ status })
      .eq("id", id);

    if (!error) {
      setInquiries((prev) =>
        prev.map((inquiry) =>
          inquiry.id === id ? { ...inquiry, status: status as FranchiseInquiry["status"] } : inquiry
        )
      );
      // 통계 갱신
      fetchStats();
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 페이지 크기 변경 핸들러
  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1); // 페이지 크기 변경 시 첫 페이지로 이동
  };

  // 새로고침 핸들러
  const handleRefresh = () => {
    fetchInquiries();
    fetchStats();
  };

  // 총 페이지 수 계산
  const totalPages = Math.ceil(totalCount / pageSize);

  // 페이지 번호 배열 생성 (최대 5개 표시)
  const getPageNumbers = () => {
    const pages: number[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      const end = Math.min(totalPages, start + maxVisiblePages - 1);

      if (end - start + 1 < maxVisiblePages) {
        start = Math.max(1, end - maxVisiblePages + 1);
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.push("/admin/login");
        return;
      }
      fetchInquiries();
      fetchStats();
    };

    checkAuth();
  }, [router, fetchInquiries, fetchStats]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-zinc-300 border-t-zinc-900 rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <AdminHeader
        title="가맹문의 관리"
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        onLogout={handleLogout}
      />

      {/* Content */}
      <main className="max-w-6xl mx-auto px-6 pt-24 pb-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 border border-zinc-200">
            <div className="text-sm text-zinc-500">전체 문의</div>
            <div className="text-2xl font-semibold mt-1">{stats.total}</div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-zinc-200">
            <div className="text-sm text-zinc-500">대기 중</div>
            <div className="text-2xl font-semibold mt-1 text-yellow-600">
              {stats.pending}
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-zinc-200">
            <div className="text-sm text-zinc-500">완료</div>
            <div className="text-2xl font-semibold mt-1 text-emerald-600">
              {stats.completed}
            </div>
          </div>
        </div>

        {/* Inquiries List */}
        {inquiries.length === 0 ? (
          <div className="bg-white rounded-xl border border-zinc-200 p-12 text-center">
            <p className="text-zinc-500">아직 접수된 문의가 없습니다.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {inquiries.map((inquiry) => (
              <div
                key={inquiry.id}
                className="bg-white rounded-xl border border-zinc-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-lg font-semibold text-zinc-900">
                        {inquiry.name}
                      </h3>
                      <span
                        className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                          statusLabels[inquiry.status]?.className ||
                          statusLabels.pending.className
                        }`}
                      >
                        {statusLabels[inquiry.status]?.label || "대기"}
                      </span>
                    </div>

                    <div className="space-y-2 text-sm text-zinc-600">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-zinc-400" />
                        <a
                          href={`tel:${inquiry.phone}`}
                          className="hover:text-zinc-900"
                        >
                          {inquiry.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-zinc-400" />
                        <span>{inquiry.region}</span>
                      </div>
                      {inquiry.message && (
                        <div className="flex items-start gap-2 mt-3">
                          <MessageSquare className="w-4 h-4 text-zinc-400 mt-0.5" />
                          <p className="text-zinc-700">{inquiry.message}</p>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 text-xs text-zinc-400">
                      {new Date(inquiry.created_at).toLocaleString("ko-KR", {
                        timeZone: "Asia/Seoul",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>

                  {/* Status Update */}
                  <div className="flex sm:flex-col gap-2">
                    <button
                      onClick={() => updateStatus(inquiry.id, "pending")}
                      className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                        inquiry.status === "pending"
                          ? "bg-yellow-100 border-yellow-300 text-yellow-800"
                          : "border-zinc-200 text-zinc-600 hover:bg-zinc-50"
                      }`}
                    >
                      대기
                    </button>
                    <button
                      onClick={() => updateStatus(inquiry.id, "contacted")}
                      className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                        inquiry.status === "contacted"
                          ? "bg-blue-100 border-blue-300 text-blue-800"
                          : "border-zinc-200 text-zinc-600 hover:bg-zinc-50"
                      }`}
                    >
                      연락완료
                    </button>
                    <button
                      onClick={() => updateStatus(inquiry.id, "completed")}
                      className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                        inquiry.status === "completed"
                          ? "bg-emerald-100 border-emerald-300 text-emerald-800"
                          : "border-zinc-200 text-zinc-600 hover:bg-zinc-50"
                      }`}
                    >
                      완료
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalCount > 0 && (
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-xl border border-zinc-200 p-4">
            {/* 페이지당 표시 개수 */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-zinc-500">페이지당</span>
              <select
                value={pageSize}
                onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                className="px-3 py-1.5 text-sm border border-zinc-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
              >
                {PAGE_SIZE_OPTIONS.map((size) => (
                  <option key={size} value={size}>
                    {size}개
                  </option>
                ))}
              </select>
              <span className="text-sm text-zinc-500">
                (총 {totalCount}건)
              </span>
            </div>

            {/* 페이지 네비게이션 */}
            <div className="flex items-center gap-1">
              {/* 이전 버튼 */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="이전 페이지"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* 페이지 번호들 */}
              {getPageNumbers().map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`min-w-[36px] h-9 px-3 text-sm font-medium rounded-lg transition-colors ${
                    page === currentPage
                      ? "bg-zinc-900 text-white"
                      : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
                  }`}
                >
                  {page}
                </button>
              ))}

              {/* 다음 버튼 */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="다음 페이지"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
