"use client";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

export default function AddPost() {
  // remember this is how you use use state. title is how you access
  // the value and setTitle is how you update it
  // call useState() to set the initial value
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  let toastPostID: string;
  // creating the input form that users will use to create posts

  //Create a post
  // React query doesn't actually fetch you the data, so we'll use Axios
  // Here is where you get an api to send data to
  const { mutate } = useMutation({
    // First param is an async func
    mutationFn: async (title: string) =>
      await axios.post("/api/posts/addPost", { title }),
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.dismiss(toastPostID);
        toast.error(error.response.data.message, { id: toastPostID });
      }
      setIsDisabled(false);
    },
    onSuccess: (data) => {
      toast.dismiss(toastPostID);
      toast.success("Successfully created post", { id: toastPostID });
      setTitle("");
      setIsDisabled(false);
    },
  });

  const submitPost = async (e: React.FormEvent) => {
    // stops refreshing after pressing the button
    e.preventDefault();
    toastPostID = toast.loading("Creating your post", { id: toastPostID });
    // disables the button after
    setIsDisabled(true);

    // doesn't run until you call mutate
    mutate(title);
  };
  return (
    <form onSubmit={submitPost} className="bg-white my-8 p-8 rounded-md">
      <div className="flex flex-col my-4">
        <textarea
          onChange={(e) => setTitle(e.target.value)}
          name="title"
          value={title}
          placeholder="Give me a thought"
          className="p-4 text-lg rounded-md my-2 bg-gray-200"
        ></textarea>
      </div>
      <div className="flex items-center justify-between gap-2">
        <p
          className={`font-bold text-sm ${
            title.length > 300 ? "text-red-700" : "text-gray-700"
          }`}
        >{`${title.length}/300`}</p>
        <button
          disabled={isDisabled}
          className="text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25"
          type="submit"
        >
          {" "}
          Create Post
        </button>
      </div>
    </form>
  );
}
