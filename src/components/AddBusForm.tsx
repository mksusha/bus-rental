// src/components/AddBusForm.tsx
import { useState, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { supabase } from "../lib/supabaseClient";

type Bus = {
    id: number;
    name: string;
    seats: number;
    price: number;
    driver_exp: number;
    min_time: number;
    image_url: string[] | null; // массив фото
    toilet: boolean;
    tea_coffee: boolean;
    reclining_seats: boolean;
    ac: boolean;
    luggage: string;
};

type AddBusFormProps = {
    onAdded?: () => void;
    busToEdit?: Bus | null;
};

type FormState = {
    name: string;
    seats: number | null;
    price: number | null;
    driverExp: number | null;
    minTime: number | null;
    images: File[];          // новые фото для загрузки
    existingImages: string[]; // уже загруженные фото при редактировании
    toilet: boolean;
    tea_coffee: boolean;
    reclining_seats: boolean;
    ac: boolean;
    luggage: string;
};

export default function AddBusForm({ onAdded, busToEdit }: AddBusFormProps) {
    const [form, setForm] = useState<FormState>({
        name: "",
        seats: null,
        price: null,
        driverExp: null,
        minTime: null,
        images: [],
        existingImages: [],
        toilet: false,
        tea_coffee: false,
        reclining_seats: false,
        ac: false,
        luggage: "",
    });

    const [loading, setLoading] = useState(false);

    // Заполняем форму при редактировании
    useEffect(() => {
        if (busToEdit) {
            setForm({
                name: busToEdit.name,
                seats: busToEdit.seats,
                price: busToEdit.price,
                driverExp: busToEdit.driver_exp,
                minTime: busToEdit.min_time,
                images: [],
                existingImages: busToEdit.image_url || [],
                toilet: busToEdit.toilet,
                tea_coffee: busToEdit.tea_coffee,
                reclining_seats: busToEdit.reclining_seats,
                ac: busToEdit.ac,
                luggage: busToEdit.luggage,
            });
        }
    }, [busToEdit]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, files, type, checked } = e.target as HTMLInputElement;
        if (type === "checkbox") {
            setForm((s) => ({ ...s, [name]: checked }));
        } else if (type === "file" && files) {
            setForm((s) => ({ ...s, images: [...s.images, ...Array.from(files)] }));
        } else if (type === "number") {
            setForm((s) => ({ ...s, [name]: value ? Number(value) : null }));
        } else {
            setForm((s) => ({ ...s, [name]: value }));
        }
    };

    const removeExistingImage = (url: string) => {
        setForm((s) => ({ ...s, existingImages: s.existingImages.filter(u => u !== url) }));
    };

    const removeNewFile = (file: File) => {
        setForm((s) => ({ ...s, images: s.images.filter(f => f !== file) }));
    };

    const uploadImages = async (files: File[]): Promise<string[]> => {
        const urls: string[] = [];
        for (const file of files) {
            const fileName = `${Date.now()}-${file.name}`;
            const { error: uploadError } = await supabase.storage
                .from("buses")
                .upload(fileName, file, { cacheControl: "3600", upsert: false });
            if (uploadError) throw uploadError;

            const { data } = supabase.storage.from("buses").getPublicUrl(fileName);
            urls.push(data.publicUrl);
        }
        return urls;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const newImageUrls = form.images.length ? await uploadImages(form.images) : [];
            const allUrls = [...form.existingImages, ...newImageUrls];

            if (busToEdit) {
                const { error } = await supabase
                    .from("buses")
                    .update({
                        name: form.name,
                        seats: form.seats,
                        price: form.price,
                        driver_exp: form.driverExp,
                        min_time: form.minTime,
                        image_url: allUrls,
                        toilet: form.toilet,
                        tea_coffee: form.tea_coffee,
                        reclining_seats: form.reclining_seats,
                        ac: form.ac,
                        luggage: form.luggage,
                    })
                    .eq("id", busToEdit.id);
                if (error) throw error;
            } else {
                const { error } = await supabase.from("buses").insert([{
                    name: form.name,
                    seats: form.seats,
                    price: form.price,
                    driver_exp: form.driverExp,
                    min_time: form.minTime,
                    image_url: allUrls,
                    toilet: form.toilet,
                    tea_coffee: form.tea_coffee,
                    reclining_seats: form.reclining_seats,
                    ac: form.ac,
                    luggage: form.luggage,
                }]);
                if (error) throw error;
            }

            setForm({
                name: "",
                seats: null,
                price: null,
                driverExp: null,
                minTime: null,
                images: [],
                existingImages: [],
                toilet: false,
                tea_coffee: false,
                reclining_seats: false,
                ac: false,
                luggage: "",
            });

            onAdded?.();
            alert(busToEdit ? "Автобус обновлен" : "Автобус добавлен");
        } catch (err: unknown) {
            console.error(err);
            if (err instanceof Error) alert("Ошибка: " + err.message);
            else alert("Ошибка: " + JSON.stringify(err));
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
            <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Название"
                className="w-full p-2 border rounded"
            />
            <input
                name="seats"
                value={form.seats ?? ""}
                type="number"
                onChange={handleChange}
                placeholder="Кол-во мест"
                className="w-full p-2 border rounded"
            />
            <input
                name="price"
                value={form.price ?? ""}
                type="number"
                onChange={handleChange}
                placeholder="Стоимость в час"
                className="w-full p-2 border rounded"
            />
            <input
                name="driverExp"
                value={form.driverExp ?? ""}
                type="number"
                onChange={handleChange}
                placeholder="Опыт водителя в годах"
                className="w-full p-2 border rounded"
            />
            <input
                name="minTime"
                value={form.minTime ?? ""}
                type="number"
                onChange={handleChange}
                placeholder="Мин. время заказа в часах"
                className="w-full p-2 border rounded"
            />
            <input
                name="images"
                type="file"
                accept="image/*"
                multiple
                onChange={handleChange}
                className="w-full"
            />

            {/* Превью фото */}
            <div className="flex flex-wrap gap-2">
                {form.existingImages.map(url => (
                    <div key={url} className="relative">
                        <img src={url} className="w-24 h-24 object-cover rounded" />
                        <button
                            type="button"
                            onClick={() => removeExistingImage(url)}
                            className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 text-xs"
                        >
                            ×
                        </button>
                    </div>
                ))}
                {form.images.map(file => (
                    <div key={file.name} className="relative">
                        <img src={URL.createObjectURL(file)} className="w-24 h-24 object-cover rounded" />
                        <button
                            type="button"
                            onClick={() => removeNewFile(file)}
                            className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 text-xs"
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>

            <div className="flex flex-col gap-2">
                <label>
                    <input type="checkbox" name="toilet" checked={form.toilet} onChange={handleChange} /> Туалет
                </label>
                <label>
                    <input type="checkbox" name="tea_coffee" checked={form.tea_coffee} onChange={handleChange} /> Чай/Кофе
                </label>
                <label>
                    <input type="checkbox" name="reclining_seats" checked={form.reclining_seats} onChange={handleChange} /> Раскладывающиеся кресла
                </label>
                <label>
                    <input type="checkbox" name="ac" checked={form.ac} onChange={handleChange} /> Кондиционер
                </label>
            </div>

            <textarea
                name="luggage"
                value={form.luggage}
                onChange={handleChange}
                placeholder="Описание багажа"
                className="w-full p-2 border rounded"
            />

            <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 rounded bg-blue-600 text-white"
            >
                {loading ? "Загрузка..." : busToEdit ? "Обновить автобус" : "Добавить автобус"}
            </button>
        </form>
    );
}
