import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddCardModal({ isOpen, onClose }: AddCardModalProps) {
  const [title, setTitle] = useState("");
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      // TODO: Replace with real save logic (API call / mutation)
      await new Promise((r) => setTimeout(r, 600));
      // After save close the modal
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Card</DialogTitle>
          <DialogDescription>
            Add a new card to your account. Fill in the fields below and click
            save.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 gap-2">
            <Label htmlFor="card-title">Title</Label>
            <Input
              id="card-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Personal Visa"
            />
          </div>

          <div className="grid grid-cols-1 gap-2">
            <Label htmlFor="card-number">Card Number</Label>
            <Input
              id="card-number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="xxxx-xxxx-xxxx-xxxx"
            />
          </div>
        </div>

        <div className="flex items-center justify-end space-x-2 pt-4">
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save Card"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
