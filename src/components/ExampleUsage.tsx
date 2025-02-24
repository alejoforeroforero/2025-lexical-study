import { Modal } from './shared/Modal'
import { useModal } from '../hooks/useModal'

export function ExampleUsage() {
  const { isOpen, openModal, closeModal } = useModal()

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title="Example Modal"
      >
        <div className="space-y-4">
          <p>This is an example of modal content.</p>
          <p>You can put any content here!</p>
          
          <div className="flex justify-end space-x-2">
            <button 
              onClick={closeModal}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button 
              onClick={() => {
                // Handle confirmation
                closeModal()
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}