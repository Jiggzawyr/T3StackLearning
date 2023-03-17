import { ShoppingItem } from "@prisma/client";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { api } from "~/utils/api";

interface ItemModalProps {
    setModalOpen: Dispatch<SetStateAction<boolean>>,
    setItems: Dispatch<SetStateAction<ShoppingItem[]>>
}

const ItemModal: FC<ItemModalProps> = ({setModalOpen, setItems}) => {

    const [input, setInput] = useState<string>("")
    const addItem = api.item.addItem.useMutation({
        onSuccess(shoppingItem){
            setItems((prevItems) => [...prevItems,shoppingItem])
        }
    }).mutate;

    return <div className="absolute inset-0 flex items-center justify-center bg-black/75">
        <div className="p-3 space-y-4 bg-white">
            <h3 className="text-xl font-semibold">Name of item</h3>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full bg-gray-200 rounded-md border-gray-300 shadow-sm focus:border-x-violet-300 focus:ring-2"
            />
            <div className="grid grid-cols-2 gap-8">
                <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className='rounded-md bg-gray-500 p-1 text-xs text-white transition hover:bg-gray-600'
                >   
                    Cancel
                </button>
                <button
                    type="button"
                    onClick={() => {
                        addItem({ text: input }) 
                        setModalOpen(false)
                    }}
                    className='rounded-md bg-violet-500 p-1 text-xs text-white transition hover:bg-violet-600'
                >   
                    Add
                </button>
            </div>
        </div>
    </div>
}

export default ItemModal