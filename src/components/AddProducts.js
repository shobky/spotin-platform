/* eslint-disable default-case */
import { useState } from "react"
import { db, storage } from "../firebase/Config"
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"

const AddProducts = () => {

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState(null)

    const handleProductImage = (e) => {

        let selectedFile = e.target.files[0];
        if (selectedFile) {
            setImage(selectedFile)
        }
    }
    const handleAddProducts = (e) => {
        e.preventDefault();
        // console.log({name, desc, price, image})
        const storageRef = ref(storage, `product-images/${image.name}`)
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            },
            (error) => {
                console.log(error.message)
            },
            async () => {

                // Upload completed successfully, now we can get the download URL
                // getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                //     console.log('File available at', downloadURL);
                // });

                const url = await getDownloadURL(uploadTask.snapshot.ref)
                const docRef = await addDoc(collection(db, "pos"), {
                    name,
                    price: Number(price),
                    url
                });
                console.log("Document written with ID: ", docRef.id);
                document.getElementById("addProdcutForm").reset();


            }
        );
    }

    return (
        <div >
            <h1>Add New Products</h1>
            <form
                id="addProdcutForm"
                onSubmit={handleAddProducts}
                style={{ display: "grid", width: "200px", margin: "50px", fontSize: "25px" }}
            >
                <label className="add-products_label">Name</label>
                <input
                    onChange={(e) => setName(e.target.value)}
                    required className="add-products_input" type="text" />

                <label className="add-products_label">price</label>
                <input
                    onChange={(e) => setPrice(e.target.value)}
                    required className="add-products_input" type="text" />

                <label id="file" className="add-products_label">image</label>
                <input
                    onChange={(e) => handleProductImage(e)}
                    required className="add-products_input" type="file" />

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AddProducts