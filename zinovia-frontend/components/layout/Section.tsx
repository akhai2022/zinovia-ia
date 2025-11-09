import React from "react";
import { cn } from "@/lib/utils";
import Container from "./Container";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
}

const Section: React.FC<SectionProps> = ({
  children,
  className,
  containerClassName,
  id,
}) => {
  return (
    <section
      id={id}
      className={cn(
        "py-16 md:py-24 lg:py-32",
        className
      )}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
};

export default Section;

