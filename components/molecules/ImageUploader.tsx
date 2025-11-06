'use client'

import { useState, useRef, DragEvent, ChangeEvent } from 'react'
import NextImage from 'next/image'
import { css, cx } from '@/styled-system/css'
import { Icon } from '@/components/atoms'

export interface ImageUploaderProps {
  onUpload: (files: File[]) => void
  accept?: string
  maxSize?: number // bytes
  multiple?: boolean
  className?: string
}

export function ImageUploader({
  onUpload,
  accept = 'image/*',
  maxSize = 5 * 1024 * 1024, // 5MB
  multiple = false,
  className,
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [previews, setPreviews] = useState<string[]>([])
  const [files, setFiles] = useState<File[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    const droppedFiles = Array.from(e.dataTransfer.files)
    processFiles(droppedFiles)
  }

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : []
    processFiles(selectedFiles)
  }

  const processFiles = (newFiles: File[]) => {
    // 파일 크기 검증
    const validFiles = newFiles.filter((file) => {
      if (file.size > maxSize) {
        alert(`파일 크기는 ${maxSize / 1024 / 1024}MB를 초과할 수 없습니다.`)
        return false
      }
      return true
    })

    if (validFiles.length === 0) return

    // 미리보기 생성
    const newPreviews = validFiles.map((file) => URL.createObjectURL(file))

    if (multiple) {
      setFiles([...files, ...validFiles])
      setPreviews([...previews, ...newPreviews])
    } else {
      setFiles(validFiles)
      setPreviews(newPreviews)
    }

    onUpload(multiple ? [...files, ...validFiles] : validFiles)
  }

  const handleRemove = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index)
    const newPreviews = previews.filter((_, i) => i !== index)

    URL.revokeObjectURL(previews[index])

    setFiles(newFiles)
    setPreviews(newPreviews)
    onUpload(newFiles)
  }

  return (
    <div className={cx(css({ width: '100%' }), className)}>
      {/* 드롭존 */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={cx(
          css({
            border: '2px dashed',
            borderRadius: 'lg',
            p: '2rem',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s',
            _hover: {
              borderColor: 'accent',
              bg: 'gray.50',
            },
          }),
          isDragging
            ? css({
                borderColor: 'accent',
                bg: 'gray.50',
              })
            : css({
                borderColor: 'gray.300',
                bg: 'white',
              })
        )}
      >
        <Icon name="upload" size="3rem" color="gray.400" />
        <p
          className={css({
            mt: '1rem',
            fontSize: 'sm',
            color: 'gray.600',
          })}
        >
          클릭하거나 파일을 드래그하여 업로드
        </p>
        <p
          className={css({
            mt: '0.5rem',
            fontSize: 'xs',
            color: 'gray.500',
          })}
        >
          {accept} (최대 {maxSize / 1024 / 1024}MB)
        </p>
      </div>

      {/* 숨겨진 파일 입력 */}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileSelect}
        className={css({ display: 'none' })}
      />

      {/* 미리보기 */}
      {previews.length > 0 && (
        <div
          className={css({
            mt: '1rem',
            display: 'grid',
            gridTemplateColumns: { base: '2', md: '4' },
            gap: '1rem',
          })}
        >
          {previews.map((preview, index) => (
            <div
              key={index}
              className={css({
                position: 'relative',
                aspectRatio: '1',
                borderRadius: 'md',
                overflow: 'hidden',
                bg: 'gray.200',
              })}
            >
              <NextImage
                src={preview}
                alt={`Preview ${index + 1}`}
                fill
                className={css({
                  objectFit: 'cover',
                })}
              />
              {/* 삭제 버튼 */}
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className={css({
                  position: 'absolute',
                  top: '0.5rem',
                  right: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '2rem',
                  height: '2rem',
                  bg: 'rgba(0, 0, 0, 0.6)',
                  borderRadius: 'full',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  _hover: {
                    bg: 'rgba(0, 0, 0, 0.8)',
                  },
                })}
              >
                <Icon name="close" size="1.25rem" color="white" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
