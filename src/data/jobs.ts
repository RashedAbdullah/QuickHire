export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  category: string;
  type: string;
  description: string;
  fullDescription: string;
  tags: string[];
  postedAt: string;
}

export const categories = [
  { name: "Design", count: 235, icon: "Palette" },
  { name: "Sales", count: 756, icon: "BarChart3" },
  { name: "Marketing", count: 140, icon: "Megaphone" },
  { name: "Finance", count: 325, icon: "Wallet" },
  { name: "Technology", count: 436, icon: "Monitor" },
  { name: "Engineering", count: 542, icon: "Code2" },
  { name: "Business", count: 211, icon: "Briefcase" },
  { name: "Human Resource", count: 346, icon: "Users" },
];

export const locations = [
  "All Locations",
  "Madrid, Spain",
  "San Francisco, USA",
  "Berlin, Germany",
  "Paris, France",
  "Manchester, UK",
  "Ontario, Canada",
  "Marseille, France",
  "San Diego, US",
  "Lucern, Switzerland",
  "Granada, Spain",
  "Hamburg, Germany",
  "Florence, Italy",
];

export const defaultJobs: Job[] = [
  {
    id: "1",
    title: "Email Marketing",
    company: "Revolut",
    location: "Madrid, Spain",
    category: "Marketing",
    type: "Full Time",
    description:
      "Revolut is looking for Email Marketing to help team manage campaigns and drive growth.",
    fullDescription:
      "We are looking for an experienced Email Marketing specialist to join our team. You will be responsible for creating, managing and optimizing email campaigns that drive engagement and conversions. The ideal candidate has 3+ years of experience with email marketing platforms, A/B testing, and analytics. You should be comfortable working with cross-functional teams and have a data-driven mindset.",
    tags: ["Marketing", "Design"],
    postedAt: "2 days ago",
  },
  {
    id: "2",
    title: "Brand Designer",
    company: "Dropbox",
    location: "San Francisco, USA",
    category: "Design",
    type: "Full Time",
    description:
      "Dropbox is looking for Brand Designer to help the team create stunning visual identities.",
    fullDescription:
      "As a Brand Designer at Dropbox, you'll shape the visual identity of one of the world's most recognized brands. You'll work closely with marketing, product, and content teams to create compelling visual narratives. Requirements include 4+ years of brand design experience, proficiency in Figma and Adobe Creative Suite, and a strong portfolio showcasing brand systems work.",
    tags: ["Design", "Business"],
    postedAt: "3 days ago",
  },
  {
    id: "3",
    title: "Email Marketing",
    company: "Pitch",
    location: "Berlin, Germany",
    category: "Marketing",
    type: "Full Time",
    description:
      "Pitch is looking for Customer Manager to join marketing team and drive engagement.",
    fullDescription:
      "Join Pitch as an Email Marketing specialist. You'll develop and execute email strategies that increase user engagement and retention. The role requires experience with marketing automation tools, segmentation strategies, and performance analytics. Collaborative environment with a focus on innovation.",
    tags: ["Marketing"],
    postedAt: "1 day ago",
  },
  {
    id: "4",
    title: "Visual Designer",
    company: "Blinklist",
    location: "Granada, Spain",
    category: "Design",
    type: "Full Time",
    description:
      "Blinklist is looking for Visual Designer to help team design beautiful interfaces.",
    fullDescription:
      "Blinklist is seeking a Visual Designer to create beautiful, intuitive interfaces. You'll be responsible for UI design, icon systems, and illustration. We're looking for someone with a keen eye for detail and experience in mobile and web design. Proficiency in Figma required.",
    tags: ["Design"],
    postedAt: "5 days ago",
  },
  {
    id: "5",
    title: "Product Designer",
    company: "ClassPass",
    location: "Manchester, UK",
    category: "Design",
    type: "Full Time",
    description:
      "ClassPass is looking for Product Designer to help us build great user experiences.",
    fullDescription:
      "As a Product Designer at ClassPass, you'll design end-to-end user experiences for our platform. From research to prototyping to final design handoff, you'll own the full design process. We value collaboration, user empathy, and a drive for continuous improvement. 3+ years product design experience required.",
    tags: ["Marketing", "Design"],
    postedAt: "1 week ago",
  },
  {
    id: "6",
    title: "Lead Designer",
    company: "Canva",
    location: "Ontario, Canada",
    category: "Design",
    type: "Full Time",
    description:
      "Canva is looking for Lead Engineer to help develop new design tools and features.",
    fullDescription:
      "Lead the design team at Canva to ship world-class creative tools. You'll mentor designers, set design direction, and collaborate with engineering and product leadership. Experience leading design teams of 5+ people and a track record of shipping consumer products is essential.",
    tags: ["Design", "Business"],
    postedAt: "4 days ago",
  },
  {
    id: "7",
    title: "Brand Strategist",
    company: "GoDaddy",
    location: "Marseille, France",
    category: "Marketing",
    type: "Full Time",
    description:
      "GoDaddy is looking for Brand Strategist to join the team and build brand identity.",
    fullDescription:
      "As Brand Strategist at GoDaddy, you'll define and evolve our brand positioning across all channels. You'll conduct market research, develop brand guidelines, and ensure consistency across touchpoints. Strong analytical and creative skills required. 5+ years brand strategy experience preferred.",
    tags: ["Marketing"],
    postedAt: "6 days ago",
  },
  {
    id: "8",
    title: "Data Analyst",
    company: "Twitter",
    location: "San Diego, US",
    category: "Technology",
    type: "Full Time",
    description:
      "Twitter is looking for Data Analyst to help team design data-driven strategies.",
    fullDescription:
      "Join Twitter as a Data Analyst to uncover insights that drive product decisions. You'll work with large datasets, build dashboards, and present findings to stakeholders. Proficiency in SQL, Python, and data visualization tools required. Experience with A/B testing and statistical analysis is a plus.",
    tags: ["Technology"],
    postedAt: "3 days ago",
  },
  {
    id: "9",
    title: "Social Media Assistant",
    company: "Nomad",
    location: "Paris, France",
    category: "Marketing",
    type: "Full Time",
    description:
      "Nomad is looking for Social Media Assistant to manage social channels and content.",
    fullDescription:
      "Nomad is seeking a Social Media Assistant to help manage and grow our social media presence. You'll create content, engage with our community, and track performance metrics. Experience with social media management tools and a creative flair are essential.",
    tags: ["Marketing", "Design"],
    postedAt: "2 days ago",
  },
  {
    id: "10",
    title: "Interactive Developer",
    company: "Terraform",
    location: "Hamburg, Germany",
    category: "Engineering",
    type: "Full Time",
    description:
      "Terraform is looking for Interactive Developer to build engaging web experiences.",
    fullDescription:
      "As an Interactive Developer at Terraform, you'll create immersive web experiences using modern technologies. Experience with Three.js, WebGL, GSAP, and React is highly valued. You'll work on creative campaigns and product experiences. Strong portfolio of interactive work required.",
    tags: ["Design", "Technology"],
    postedAt: "1 week ago",
  },
  {
    id: "11",
    title: "HR Manager",
    company: "Packer",
    location: "Lucern, Switzerland",
    category: "Human Resource",
    type: "Full Time",
    description:
      "Packer is looking for HR Manager to lead people operations and talent acquisition.",
    fullDescription:
      "Lead people operations at Packer as our HR Manager. You'll oversee recruitment, onboarding, performance management, and employee relations. We're looking for someone with 5+ years HR experience, strong interpersonal skills, and a passion for building great company culture.",
    tags: ["Marketing", "Business"],
    postedAt: "4 days ago",
  },
  {
    id: "12",
    title: "Frontend Developer",
    company: "Netlify",
    location: "Paris, France",
    category: "Engineering",
    type: "Full Time",
    description:
      "Netlify is looking for Frontend Developer to build modern web applications.",
    fullDescription:
      "Join Netlify as a Frontend Developer and help build the future of web development. You'll work with React, TypeScript, and modern web APIs to create developer tools used by millions. Strong understanding of web performance, accessibility, and modern CSS required.",
    tags: ["Technology", "Engineering"],
    postedAt: "1 day ago",
  },
];
