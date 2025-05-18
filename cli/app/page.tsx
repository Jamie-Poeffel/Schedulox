"use client";
import { useSession } from "@/hooks/auth";
import { useUser } from "@/hooks/user";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  const { data: user } = useUser();

  const redirectToLogin = () => {
    if (!session) {
      router.push("/login");
    }
    if (session && user) {
      router.push("/dashboard");
    }
    if (session && !user) {
      router.push("/setup");
    }
  }

  return (
    <div className="max-w-screen overflow-x-hidden h-dvh">
      <div className="h-dvh max-w-screen flex flex-col justify-center items-center gap-10">
        <div className="flex flex-col justify-center items-center">
          <h1 className="font-bold text-8xl -translate-y-10">Schedulox</h1>
          <h2 className="font-bold text-3xl -translate-y-5">Plan your coding projects fast and symplea</h2>
        </div>
        <button onClick={redirectToLogin} className="font-semibold text-lg text-white bg-[#7209B7]/60 px-6 py-2 rounded-[16px]">Get Started</button>
      </div>
    </div>
  );
}
