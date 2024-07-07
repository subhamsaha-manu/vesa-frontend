import { Button, HStack, useToast, VStack } from '@chakra-ui/react'
import { isNil } from 'lodash'
import React, { useState } from 'react'

import { parseCSV } from './parseCSV'

import { CSVReaderDownloader } from '@/components/elements/CSVReaderDownloader'
import { DrawerComponent } from '@/components/elements/DrawerComponent'
import { useBulkUploadQuestionsMutation } from '@/features/admin/apis/bulkUploadQuestions.generated'
import { questions } from '@/features/questions/apis/questions'

type BulkUploadQuestionFormProps = {
  isOpen: boolean
  onClose: () => void
}

type CSVData = {
  data: Array<Array<string>>
}
export const BulkUploadQuestionForm: React.FC<BulkUploadQuestionFormProps> = ({
  isOpen,
  onClose,
}) => {
  const [data, setData] = useState<CSVData>()

  const toast = useToast()

  const [bulkUploadQuestions, { loading }] = useBulkUploadQuestionsMutation({
    onCompleted: (data) => {
      if (data.bulkUploadQuestions) {
        toast({
          title: 'Questions added successfully',
          status: 'success',
          duration: 2000,
          isClosable: true,
        })
        onClose()
      }
    },
    refetchQueries: [{ query: questions }],
  })

  const handleUpload = () => {
    if (data?.data) {
      const response = parseCSV(data.data)
      bulkUploadQuestions({
        variables: {
          input: response,
        },
      })
    }
  }
  return (
    <DrawerComponent isOpen={isOpen} onClose={onClose} headerTitle="Bulk Upload Questions">
      <VStack spacing={4} align="stretch" display-name="drawer-body-vstack" h="90%">
        <CSVReaderDownloader setData={setData} />
        <HStack display-name="drawer-footer" justifyContent="end">
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            type="submit"
            disabled={isNil(data)}
            onClick={handleUpload}
            isLoading={loading}
          >
            Upload
          </Button>
        </HStack>
      </VStack>
    </DrawerComponent>
  )
}
