"use client"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button";

import { 
  Trash2, 
} from "lucide-react";
import { redirect } from "next/navigation";





const DeleteDestinationDialog = ({id}: {id: string}) => {

    const handleDelete = async () => {
       const res = await fetch(`http://localhost:8000/destination/${id}`, {
            method: 'DELETE',
        })
        const data = await res.json();
        console.log("Delete response:", data);
        
        redirect('/destinations');  
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger render={<Button
            variant="outline"
            size="sm"
            className="h-8 border-red-200 text-xs font-semibold text-red-500 hover:bg-red-50 hover:text-red-600 gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Delete
          </Button>}>
                Show Dialog
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteDestinationDialog;