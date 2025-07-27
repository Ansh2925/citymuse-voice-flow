import { LoginForm } from "@/components/LoginForm";

export default function Login() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container max-w-screen-xl mx-auto py-16 px-4">
        <div className="max-w-md mx-auto text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Welcome Back</h1>
          <p className="text-muted-foreground">
            Login to continue your journey with CityMuse
          </p>
        </div>
        <LoginForm />
      </main>
    </div>
  );
}
