import { FC, useState ,  useEffect  } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useImportDataMutation } from "@/store/services/importService";
import { BiLoaderAlt as Loader, BiUpload as Upload } from "react-icons/bi";
import { toast } from "react-hot-toast";

const formSchema = z.object({
  file: z.any(),
});


interface ImportModalProps {
  open: boolean;
  setOpen: () => void;
  loading: boolean;
}
const ImportModal: FC<ImportModalProps> = ({ open, setOpen }) => {
  const [showInputField, setShowInputField] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null); 

  const { handleSubmit, register } = useForm({
    resolver: zodResolver(formSchema),
  });

  const [create, importResponse] = useImportDataMutation();

  const handleFormSubmit = async (data:any) =>{
    const formdata = new FormData();
    formdata.append("file", data.file);

    create({ data: formdata });
  };

  const {
    isLoading: createLoading,
    isError: createError,
    isSuccess: createSuccess,
  } = importResponse;

  useEffect(() => {
    if (createError) {
      toast.error("Something Wrong.");
    }
    if (createSuccess) {
      toast.success("Product import Successfully.");
      setOpen();
    }
  }, [createError, createSuccess]);

  const handleFileChange = (event:any) => {
    setSelectedFile(event.target.files[0]); 
  };

  return (
    <>
    {/* <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import Products</DialogTitle>
          <DialogDescription>Upload a file to import products.</DialogDescription>
        </DialogHeader>

        {showInputField && (
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-2">
            <div className="flex items-center justify-between gap-4">
              <input
                type="file"
                id="file"
                accept=".xls, .xlsx"
                onChange={handleFileChange} 
              />
              // {/* {isError && <p>Error uploading file</p>} 
              <Button
                disabled={!selectedFile || createLoading} 
                className="w-24"
                type="submit"
              >
                {createLoading ? (
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Import"
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog> */}
    </>
    
  );
};


export default ImportModal;
