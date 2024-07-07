import { Button, Flex, IconButton, Tooltip } from '@chakra-ui/react'
import React, { CSSProperties } from 'react'
import { FaFileCsv } from 'react-icons/fa6'
import { IoCloseSharp } from 'react-icons/io5'
import { MdDownloading } from 'react-icons/md'
import { useCSVDownloader, useCSVReader } from 'react-papaparse'

const styles = {
  csvReader: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
  } as CSSProperties,
  browseFile: {
    width: '20%',
  } as CSSProperties,
  acceptedFile: {
    border: '1px solid #ccc',
    height: 45,
    lineHeight: 2.5,
    paddingLeft: 10,
    width: '80%',
  } as CSSProperties,
  remove: {
    borderRadius: 0,
    padding: '0 20px',
  } as CSSProperties,
  progressBarBackgroundColor: {
    backgroundColor: '#00a0dc',
  } as CSSProperties,
}

type CSVReaderDownloaderProps = {
  setData: (param: any) => void
}

export const CSVReaderDownloader: React.FC<CSVReaderDownloaderProps> = ({ setData }) => {
  const { CSVReader } = useCSVReader()
  const { CSVDownloader, Type } = useCSVDownloader()

  const data = [
    {
      'Question Title': '',
      'Option 1': '',
      'Option 2': '',
      'Option 3': '',
      'Option 4': '',
      'Correct Option Index': '',
    },
  ]

  const columns = [
    'Question Title',
    'Option 1',
    'Option 2',
    'Option 3',
    'Option 4',
    'Correct Option Index',
  ]

  return (
    <>
      <CSVReader
        onUploadAccepted={(results: any) => {
          setData(results)
        }}
      >
        {({ getRootProps, acceptedFile, ProgressBar, getRemoveFileProps }: any) => (
          <>
            <div style={styles.csvReader}>
              <div style={styles.acceptedFile}>{acceptedFile && acceptedFile.name}</div>
              <Flex display-name="csv-reader-action-items" align="center" ml="5px" gap="5px">
                <Tooltip label="Upload CSV" hasArrow fontSize="sm">
                  <IconButton
                    variant="outline"
                    aria-label="Delete question"
                    icon={<FaFileCsv fontSize="15px" />}
                    {...getRootProps()}
                  />
                </Tooltip>
                <Tooltip label="Remove CSV" hasArrow fontSize="sm">
                  <IconButton
                    variant="outline"
                    aria-label="Delete question"
                    icon={<IoCloseSharp fontSize="15px" color="red" />}
                    {...getRemoveFileProps()}
                  />
                </Tooltip>
              </Flex>
            </div>
            <ProgressBar style={styles.progressBarBackgroundColor} />
          </>
        )}
      </CSVReader>
      <Button rightIcon={<MdDownloading fontSize="25px" />} colorScheme="blue" variant="outline">
        <CSVDownloader
          type={Type.Button}
          filename="bulkQuestion"
          bom={true}
          config={{
            delimiter: ',',
            columns,
          }}
          data={data}
        >
          Download Template
        </CSVDownloader>
      </Button>
    </>
  )
}
