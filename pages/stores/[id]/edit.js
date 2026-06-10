import { useRouter } from 'next/router'
import { useRef, useEffect, useState } from 'react'
import { Layout, Navbar } from '../../../components'
import { editStore, getStoreById } from '../../../data/stores'
import StoreForm from '../../../components/store/form'

export default function EditStore() {
  const [store, setStore] = useState(null)
  const nameEl = useRef()
  const descriptionEl = useRef()
  const router = useRouter()
  const { id } = router.query

  // Cleaner way to fetch store data on page load and when the id changes
  useEffect(() => {
    // Don't attempt to fetch store data until the router is ready and we have an id to fetch with
    if (!router.isReady || !id) return

    // Set up an ignore flag to prevent setting state on an unmounted component if the user navigates away before the fetch completes
    let ignore = false

    // Clear the previous store while the new store is loading
    setStore(null)

    // If component is still mounted, fetch the store data by id like normal
    getStoreById(id).then(storeData => {
      if (!ignore && storeData) {
        setStore(storeData)
      }
    })

    // Clean up function to set the ignore flag if the component unmounts before the fetch completes
    return () => {
      ignore = true
    }
  }, [router.isReady, id])

  // Cleaner way to set form values when the store data changes
  useEffect(() => {
    // Don't attempt to set form values if we don't have the store data or the form refs yet
    if (!store || !nameEl.current || !descriptionEl.current) return

    // Set the form values to the store data when the store data changes
    nameEl.current.value = store.name ?? ""
    descriptionEl.current.value = store.description ?? ""

    // No refs in dependency array since ref objects are stable
  }, [store])

  const saveStore = () => {
    // Don't attempt to save if we don't have a store to save
    if (!store) return

    // Avoid saving if we don't have the form refs yet in case user clicks save before the form renders
    if (!store?.id || !nameEl.current || !descriptionEl.current) return

    // Call the editStore function with the updated store data, then navigate to the store's page on success
    editStore({
      id: id,
      name: nameEl.current.value,
      description: descriptionEl.current.value
    }).then(() => {
      router.push(`/stores/${id}`)
    })
  }

  return (
    <StoreForm nameEl={nameEl} descriptionEl={descriptionEl} saveEvent={saveStore} router={router} title="Update your store">
      <p>Update your store's name and description</p>
    </StoreForm>
  )
}

EditStore.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  )
}
