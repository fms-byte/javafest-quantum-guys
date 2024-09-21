"use client";
import Layout from "@/app/components/Layout";
import Channelcard from "@/app/components/Channelcard";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";
import checkLogin from "../components/checkLogin";
import { ApiClient } from "@asfilab/janun-client";

export default function AllChannels() {
  const router = useRouter();
  const [channels, setChannels] = useState([]);

  async function getAllChannels() {
    // setLoading(true);
    try {
      const apiUrl = "http://localhost:5000";
      const token = localStorage.getItem("token") || "";
      const apiClient = new ApiClient(apiUrl, token);
      console.log(apiClient);
      const res = await apiClient.channel.getChannels();

      // await apiClient.channel.subscribeChannel();
      // console.log(res);
      setChannels(res.data);
      // console.log(channels);
    } catch (error) {
      console.log(error);
      console.log("Error fetching channel data");
    }
    // console.log(result);
  }

  async function handleSubscribe(channelSlug, sub) {
    try {
      const apiUrl = "http://localhost:5000";
      const token = localStorage.getItem("token") || "";
      const apiClient = new ApiClient(apiUrl, token);

      if (sub)
        await apiClient.channel.unsubscribeChannel({ slug: channelSlug });
      else await apiClient.channel.subscribeChannel({ slug: channelSlug });
    } catch (error) {
      console.log(error);
      console.log("Error handling sub/unsub");
    }
  }

  useEffect(() => {
    checkLogin().then(
      (resp) => {
        // console.log(resp);
        if (!resp) router.push("/login");
      },
      () => alert("Failed to connect to sever")
    );
  }, []);

  useEffect(() => {
    getAllChannels();
  }, []);

  return (
    <>
      <Layout>
        <div className="w-screen flex flex-col items-center ml-64 mr-16">
          {channels.map((el) => (
            <Channelcard
              key={el.slug}
              channelName={el.name}
              channelDes={el.description}
              channelImg={el.cover}
              subStatus={el.subscribed}
              subCount={el.subscriberCount}
              subscriber={handleSubscribe}
              channelSlug={el.slug}
            />
          ))}
        </div>
      </Layout>
    </>
  );
}
