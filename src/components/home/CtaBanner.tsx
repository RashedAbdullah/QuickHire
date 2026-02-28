import { Button } from "@/components/ui/button";

const CtaBanner = () => (
  <section className="container">
    <div className="bg-primary py-16 px-10">
      <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
        <div className="flex-1">
          <h2 className="mb-2 text-3xl font-semibold text-primary-foreground md:text-4xl">
            Start posting
            <br />
            jobs today
          </h2>
          <p className="mb-6 text-primary-foreground/80">
            Start posting jobs for only $10.
          </p>
          <Button
            variant="outline"
            className="border-primary-foreground bg-primary-foreground text-primary hover:bg-primary-foreground/90"
          >
            Sign Up For Free
          </Button>
        </div>
        <div className="flex-1">
          <div className="bg-card/10 p-4 backdrop-blur">
            <img src="/dashboard.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CtaBanner;
