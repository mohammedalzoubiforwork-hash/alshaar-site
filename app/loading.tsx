import { Container } from "@/components/ui/container";

export default function Loading() {
  return (
    <main className="page-shell min-h-screen">
      <Container className="py-6 sm:py-8 md:py-10">
        <div className="glass-topbar h-20 rounded-[30px] md:h-24 md:rounded-[34px]" />
        <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <div className="paper-panel min-h-[20rem] rounded-[38px] md:min-h-[28rem] lg:min-h-[36rem]" />
          <div className="space-y-5 pt-4 md:space-y-6 md:pt-8">
            <div className="h-6 w-36 rounded-full bg-white/10" />
            <div className="h-16 rounded-[24px] bg-white/10 md:h-24" />
            <div className="h-16 rounded-[24px] bg-white/8 md:h-20" />
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="h-12 w-full rounded-full bg-[#ffbf68]/20 sm:w-36" />
              <div className="h-12 w-full rounded-full bg-white/10 sm:w-32" />
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
