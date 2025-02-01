import Section from "./components/Section";

export default function Home() {
  const sections = [
    {
      title: "Hi, I'm Grace!",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      imageSrc: "/placeholder1.jpg",
      imageAlt: "Actor performing on stage",
    },
    {
      title: "My Journey",
      content:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      imageSrc: "/placeholder2.jpg",
      imageAlt: "Behind the scenes photo",
      reverse: true,
    },
    {
      title: "Recent Work",
      content:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
      imageSrc: "/placeholder3.jpg",
      imageAlt: "Performance photo",
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h1 className="text-6xl font-light">GRACE McKENNA</h1>
          <p className="text-xl text-gray-600 font-light">
            MFA Student at Rider University
          </p>
          <div className="h-[1px] w-24 bg-[#ff4d4d]"></div>
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        <div className="relative h-[600px] bg-[#f0f0f0]">
          {/* Placeholder for hero image */}
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            Hero Image Placeholder
          </div>
        </div>
      </div>
      <div className="pt-24 p-8">
        {sections.map((section, index) => (
          <Section
            key={index}
            title={section.title}
            content={section.content}
            imageSrc={section.imageSrc}
            imageAlt={section.imageAlt}
            reverse={section.reverse}
          />
        ))}
      </div>
    </div>
  );
}
