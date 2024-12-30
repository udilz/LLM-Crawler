"use client";

import React, {useState} from "react";

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const [data, setData] = useState(null);

  async function getAllLinks(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const domain = formData.get("domain");

    const res = await fetch("/api/links", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({domain}),
    });
    const data = await res.json();
    setData(data);
  }

  return (
    <div className="space-y-4 flex justify-center mt-10">
      <div className="space-y-4 w-1/3">
        <section className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="text-xl">Get Links</h3>
            <div className="flex  gap-4">
              <Link href="/">Get Links</Link>
              <Link href="/generate-ai">Generate AI</Link>
            </div>
          </div>
          <form onSubmit={getAllLinks} className="space-y-2">
            <Input name="domain" placeholder="domain.com"></Input>
            <Button>Get All Links</Button>
          </form>
        </section>
        {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      </div>
    </div>
  );
}
