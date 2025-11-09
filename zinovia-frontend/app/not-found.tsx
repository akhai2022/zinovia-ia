import Link from "next/link";
import { Home } from "lucide-react";
import Button from "@/components/ui/Button";
import Section from "@/components/layout/Section";

export default function NotFound() {
  return (
    <Section className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-gray-900 mb-4">404</h1>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/">
          <Button variant="primary" size="lg">
            <Home className="mr-2 h-5 w-5 inline" />
            Go Home
          </Button>
        </Link>
      </div>
    </Section>
  );
}

