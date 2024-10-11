import { LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Navbar } from "~/components/navbar";

export const loader: LoaderFunction = async ({ request }) => {
  // TODO: Implement proper session management
  const url = new URL(request.url);
  const userName = url.searchParams.get("name");
  
  if (!userName) {
    return redirect("/");
  }
  
  return { userName };
};

export default function UserPage() {
  const { userName } = useLoaderData<{ userName: string }>();

  return (
    <div className="min-h-screen bg-background">
      <Navbar isLoggedIn={true} userName={userName} />
      <div className="container mx-auto flex flex-col items-center justify-center h-[calc(100vh-64px)]">
        <h1 className="text-4xl font-bold mb-4 text-center text-primary">Welcome to User Dashboard</h1>
        <p className="text-xl mb-8 text-center text-foreground">Hello, {userName}! This is your personalized workspace.</p>
      </div>
    </div>
  );
}