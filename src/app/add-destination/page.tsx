
"use client";

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
import { redirect } from "next/navigation";

const categories = [
    { value: "beach", label: "Beach" },
    { value: "mountain", label: "Mountain" },
    { value: "city", label: "City" },
    { value: "adventure", label: "Adventure" },
    { value: "cultural", label: "Cultural" },
];

const inputClassName =
    "h-9 rounded-md border-transparent bg-neutral-100 focus-visible:border-ring";

const initialForm = {
    destinationName: "",
    country: "",
    category: "beach",
    price: "",
    duration: "",
    departureDate: "",
    imageUrl: "",
    description: "",
};

function FieldLabel({htmlFor,children,}: {htmlFor?: string;children: ReactNode;}) {
    return (
        <label htmlFor={htmlFor}className="mb-1.5 block text-sm font-semibold text-neutral-900">
            {children}
        </label>
    );
}

export default function AddDestinationPage() {
    const [form, setForm] = useState(initialForm);

    const update = (field: keyof typeof form, value: string) => {
        setForm((current) => ({...current,[field]: value,}));
    };

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const destinationData = {...form, price: Number(form.price),};
        console.log("Destination data:", destinationData);

        const res = await fetch('http://localhost:8000/add-destination', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(destinationData),
        });
        const data = await res.json();
        console.log("Response:", data);

        redirect('/destinations');
    };

    const handleReset = () => {setForm(initialForm);};

    // console.log(form)

    return (
        <main className="min-h-screen bg-white px-8 py-12 md:px-12">
            <h1 className="font-heading text-3xl font-normal text-neutral-900 md:text-4xl">
                Add New Travel Package
            </h1>

            <div className="mx-auto mt-10 w-full max-w-sm rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <FieldLabel htmlFor="destinationName">
                            Destination Name
                        </FieldLabel>
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
                                    {categories.map((category) => (
                                        <SelectItem
                                            key={category.value}
                                            value={category.value}
                                        >
                                            {category.label}
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
                        <FieldLabel htmlFor="departureDate">
                            Departure Date
                        </FieldLabel>
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
                            Add Travel Package
                        </Button>
                    </div>
                </form>
            </div>
        </main>
    );
}
