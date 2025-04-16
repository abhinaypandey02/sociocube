"use client";
import { Footer } from "@/components/footer";
import { getRoute } from "@/constants/routes";
import { useUser } from "@/lib/auth-client";

export function AuthFooter() {
  const [user] = useUser();
  if (user) {
    if (user.isOnboarded) {
      return (
        <Footer
          links={[
            { name: "Search", href: getRoute("Search") },
            { name: "Profile", href: getRoute("Profile") },
            { name: "How it works", href: "/#how-it-works" },
            { name: "Features", href: "/#features" },
            { name: "Terms", href: getRoute("TermsConditions") },
            { name: "Privacy", href: getRoute("PrivacyPolicy") },
          ]}
        />
      );
    }
    return (
      <Footer
        links={[
          { name: "Search", href: getRoute("Search") },
          { name: "Get listed", href: getRoute("Onboarding") },
          { name: "How it works", href: "/#how-it-works" },
          { name: "Features", href: "/#features" },
          { name: "Terms", href: getRoute("TermsConditions") },
          { name: "Privacy", href: getRoute("PrivacyPolicy") },
        ]}
      />
    );
  }
  return (
    <Footer
      links={[
        { name: "Search", href: getRoute("Search") },
        { name: "Sign up", href: getRoute("SignUp") },
        { name: "Login", href: getRoute("Login") },
        { name: "How it works", href: "/#how-it-works" },
        { name: "Features", href: "/#features" },
        { name: "Terms", href: getRoute("TermsConditions") },
        { name: "Privacy", href: getRoute("PrivacyPolicy") },
      ]}
    />
  );
}
