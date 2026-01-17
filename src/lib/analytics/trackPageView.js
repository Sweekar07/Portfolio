import supabase from "../supabase";

export async function trackPageView(analyticsData) {
  const { data, error } = await supabase.functions.invoke("track-pageview", {
    method: "POST",
    body: { analytics: analyticsData },
  });

  if (error) throw error;
  return data;
}
