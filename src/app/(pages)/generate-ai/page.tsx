"use client";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import Link from "next/link";
import React, {useState} from "react";
import ReactMarkdown from "react-markdown";

export default function Home() {
  const [data, setData] = useState<{text: string} | null>(null);

  async function generateCompanySummary(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const domain = formData.get("domain");

    const res = await fetch("/api/ai", {
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
            <h3 className="text-xl">Company Summary</h3>
            <div className="flex  gap-4">
              <Link href="/">Get Links</Link>
              <Link href="/generate-ai">Generate AI</Link>
            </div>
          </div>
          <form onSubmit={generateCompanySummary} className="space-y-2">
            <Input name="domain" placeholder="domain.com"></Input>
            <Button>Generate</Button>
          </form>
        </section>
        {data && (
          <div className="prose">
            <ReactMarkdown>{data.text}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
