type Profile = {
  name: string;
  title: string;
  bio: string;
};

async function getProfile(): Promise<Profile> {
  const res = await fetch("http://localhost:8080/api/profile?lang=en", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch profile");
  }
  return res.json();
}

export default async function Home() {
  const profile = await getProfile();

  return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-4 p-8">
        <h1 className="text-4xl font-bold">{profile.name}</h1>
        <p className="text-lg text-gray-600">{profile.title}</p>
        <p className="max-w-prose text-center text-gray-800">{profile.bio}</p>
      </main>
  );
}
