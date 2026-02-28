const companies = [
  "/vodafone.png",
  "/intel-3.png",
  "/tesla.png",
  "/amd-logo-1.png",
  "/talkit1.png",
];

const CompanyLogos = () => (
  <section className="border-b border-border bg-background py-8">
    <div className="container">
      <p className="mb-6 text-sm text-muted-foreground">
        Companies we helped grow
      </p>
      <div className="flex flex-wrap items-center justify-between gap-6">
        {companies.map((name) => (
          <div
            key={name}
            className="text-xl font-bold tracking-wide text-muted-foreground/50 md:text-2xl"
          >
            <img src={name} alt="" />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default CompanyLogos;
