import { cn } from "@/lib/utils";
import Image from "next/image";

interface PlayerAvatarProps {
  name: string;
  image?: string;
  size?: "sm" | "base" | "lg";
  className?: string;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const colors = [
    "bg-primary text-primary-foreground",
    "bg-secondary text-secondary-foreground",
    "bg-accent text-accent-foreground",
    "bg-foreground text-background",
  ];
  return colors[Math.abs(hash) % colors.length];
}

export function PlayerAvatar({
  name,
  image,
  size = "base",
  className,
}: PlayerAvatarProps) {
  const initials = getInitials(name);
  const colorClass = getColor(name);

  const sizeClasses = {
    sm: "w-12 h-12 text-lg",
    base: "w-full aspect-square text-4xl md:text-5xl",
    lg: "w-full aspect-square text-5xl md:text-7xl",
  };

  if (image) {
    return (
      <Image
        src={image}
        alt={name}
        width={800}
        height={534}
        className={cn("object-cover", sizeClasses[size], className)}
      />
    );
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center font-bold border-2 border-border select-none",
        sizeClasses[size],
        colorClass,
        className,
      )}
    >
      {initials}
    </div>
  );
}
