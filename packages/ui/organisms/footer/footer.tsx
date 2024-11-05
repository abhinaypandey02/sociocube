import Link from "next/link";

export default function Footer({
  links,
}: {
  links: { name: string; href: string }[];
}) {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 pb-16 lg:px-8">
        <nav
          aria-label="Footer"
          className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12"
        >
          {links.map((item) => (
            <div className="pb-6" key={item.name}>
              <Link
                className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                href={item.href}
              >
                {item.name}
              </Link>
            </div>
          ))}
        </nav>
        <p className="mt-10 text-center leading-5 text-gray-500">
          A website by{" "}
          <a
            className="underline underline-offset-2"
            href="https://abhinaypandey.com"
            rel="noopener"
            target="_blank"
          >
            Abhinay Pandey
          </a>
        </p>
      </div>
    </footer>
  );
}
