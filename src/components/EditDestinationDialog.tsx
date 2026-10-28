"use client";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Edit3 } from "lucide-react";

import { useState } from "react";
import type { ReactNode } from "react";
import { ImagePlus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";


// Destination type define kora holo
export interface Destination {
    _id?: string;
    destinationName: string;
    country: string;
    category: string;
    price: number | string;
    duration: string;
    departureDate: string;
    imageUrl: string;
    description: string;
}

interface EditDestinationDialogProps {
    destination: Destination;
}

const categories = [
    { value: "beach", label: "Beach" },
    { value: "mountain", label: "Mountain" },
    { value: "city", label: "City" },
    { value: "adventure", label: "Adventure" },
    { value: "cultural", label: "Cultural" },
];

const inputClassName =
    "h-9 rounded-md border-transparent bg-neutral-100 focus-visible:border-ring";

function FieldLabel({ htmlFor, children }: { htmlFor?: string; children: ReactNode }) {
    return (
        <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold text-neutral-900">
            {children}
        </label>
    );
}

const EditDestinationDialog = ({ destination }: EditDestinationDialogProps) => {
    const [form, setForm] = useState<Destination>(destination);

    const update = (field: keyof Destination, value: string) => {
        setForm((current) => ({ ...current, [field]: value }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        // _id ti alada kore bad diye baki data gulo updateData-te rakha holo
        const { _id, ...updateData } = form;
        console.log(_id)
        const destinationData = { ...updateData, price: Number(updateData.price) };

        const res = await fetch(`http://localhost:8000/destination/${destination._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(destinationData),

            
             
        });
        
        const data = await res.json();
        console.log("Response:", data);
    };

    const handleReset = () => {
        setForm(destination);
    };

    return (
        <Dialog>
            <DialogTrigger >
                <Button
                    variant="outline"
                    size="sm"
                    className="h-8 border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 gap-1.5"
                >
                    <Edit3 className="w-3.5 h-3.5" />
                    Edit
                </Button>
            </DialogTrigger>
            
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Edit Destination</DialogTitle>
                    <DialogDescription >
                        <form className="space-y-4 mt-2" onSubmit={handleSubmit}>
                            <div>
                                <FieldLabel htmlFor="destinationName">Destination Name</FieldLabel>
                                <Input
                                    id="destinationName"
                                    name="destinationName"
                                    value={form.destinationName}
                                    onChange={(event) =>
                                        update("destinationName", event.target.value)
                                    }
                                    placeholder="Bali Paradise"
                                    className={inputClassName}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <FieldLabel htmlFor="country">Country</FieldLabel>
                                    <Input
                                        id="country"
                                        name="country"
                                        value={form.country}
                                        onChange={(event) =>
                                            update("country", event.target.value)
                                        }
                                        placeholder="Indonesia"
                                        className={inputClassName}
                                        required
                                    />
                                </div>

                                <div>
                                    <FieldLabel htmlFor="category">Category</FieldLabel>
                                    <Select
                                        value={form.category}
                                        onValueChange={(value) => {
                                            if (value !== null) update("category", value);
                                        }}
                                    >
                                        <SelectTrigger
                                            id="category"
                                            className={`${inputClassName} w-full`}
                                        >
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((cat) => (
                                                <SelectItem key={cat.value} value={cat.value}>
                                                    {cat.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <FieldLabel htmlFor="price">Price (USD)</FieldLabel>
                                    <Input
                                        id="price"
                                        name="price"
                                        type="number"
                                        min="0"
                                        value={form.price}
                                        onChange={(event) =>
                                            update("price", event.target.value)
                                        }
                                        placeholder="e.g., 1299"
                                        className={inputClassName}
                                        required
                                    />
                                </div>

                                <div>
                                    <FieldLabel htmlFor="duration">Duration</FieldLabel>
                                    <Input
                                        id="duration"
                                        name="duration"
                                        value={form.duration}
                                        onChange={(event) =>
                                            update("duration", event.target.value)
                                        }
                                        placeholder="e.g., 7 Days/6 Nights"
                                        className={inputClassName}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <FieldLabel htmlFor="departureDate">Departure Date</FieldLabel>
                                <Input
                                    id="departureDate"
                                    name="departureDate"
                                    type="date"
                                    value={form.departureDate}
                                    onChange={(event) =>
                                        update("departureDate", event.target.value)
                                    }
                                    className={inputClassName}
                                    required
                                />
                            </div>

                            <div>
                                <FieldLabel htmlFor="imageUrl">Image URL</FieldLabel>
                                <Input
                                    id="imageUrl"
                                    name="imageUrl"
                                    type="url"
                                    value={form.imageUrl}
                                    onChange={(event) =>
                                        update("imageUrl", event.target.value)
                                    }
                                    placeholder="https://example.com/image.jpg"
                                    className={inputClassName}
                                    required
                                />
                            </div>

                            <div>
                                <FieldLabel htmlFor="description">Description</FieldLabel>
                                <Textarea
                                    id="description"
                                    name="description"
                                    value={form.description}
                                    onChange={(event) =>
                                        update("description", event.target.value)
                                    }
                                    placeholder="Describe the travel experience..."
                                    className="min-h-24 rounded-md border-transparent bg-neutral-100 focus-visible:border-ring"
                                    required
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleReset}
                                    className="gap-1.5 border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600"
                                >
                                    <Trash2 className="size-4" />
                                    Cancel
                                </Button>

                                <Button
                                    type="submit"
                                    className="gap-1.5 bg-[#159AA5] text-white hover:bg-[#118a93]"
                                >
                                    <ImagePlus className="size-4" />
                                    Save Destination
                                </Button>
                            </div>
                        </form>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default EditDestinationDialog;