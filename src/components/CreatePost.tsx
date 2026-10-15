import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Textarea } from "@heroui/react";
import { ImagePlus, X } from "lucide-react";
import postsService from "../services/postsService";

export default function CreatePost() {
  const [showForm, setShowForm] = useState(false);
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: (formData: FormData) => postsService.createPost(formData),
    onSuccess: () => {
      removeImg();
      setCaption("");
      setShowForm(false);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  }

  function removeImg() {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImage(null);
    setImagePreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handleCreatePost(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData();
    // VERIFY: field names "body" and "image" match what the API expects
    formData.set("body", caption);
    if (image) formData.set("image", image);

    mutate(formData);
  }

  if (!showForm) {
    return (
      <Button variant="bordered" onPress={() => setShowForm(true)}>
        What's on your mind?
      </Button>
    );
  }

  return (
    <form
      onSubmit={handleCreatePost}
      className="grid gap-3 bg-content1 rounded-xl shadow-sm p-4"
    >
      <Textarea
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        placeholder="Write something..."
      />

      {imagePreview && (
        <div className="relative">
          <img src={imagePreview} alt="" className="w-full rounded-lg" />
          <button
            type="button"
            aria-label="Remove image"
            onClick={removeImg}
            className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1"
          >
            <X size={16} />
          </button>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleImageChange}
      />

      {isError && (
        <p className="text-danger text-sm">Couldn't create the post.</p>
      )}

      <div className="flex justify-between">
        <Button
          type="button"
          variant="light"
          startContent={<ImagePlus size={18} />}
          onPress={() => fileInputRef.current?.click()}
        >
          Photo
        </Button>

        <div className="flex gap-2">
          <Button type="button" onPress={() => setShowForm(false)}>
            Cancel
          </Button>
          <Button
            type="submit"
            color="primary"
            isLoading={isPending}
            isDisabled={!caption.trim() && !image}
          >
            Post
          </Button>
        </div>
      </div>
    </form>
  );
}
