<template>
    <div
        class="container w-[600px] flex flex-col items-center justify-center h-screen gap-2 mx-auto"
    >
        <h1 class="text-2xl font-bold">Become an instructor</h1>
        <div class="relative">
            <img
                :src="avatarPreviewSrc"
                ref="avatarPreview"
                class="rounded-full w-[150px] h-[150px] object-cover border-2"
            />
            <div class="absolute bottom-0 right-0">
                <label for="avatar-input" class="cursor-pointer">
                    <el-icon color="#666" :size="24"><CameraFilled /></el-icon>
                </label>
                <input
                    hidden
                    id="avatar-input"
                    type="file"
                    ref="avatarFile"
                    accept="image/*"
                    @change="updateAvatarPreview"
                />
            </div>
        </div>
        <div class="w-full">
            <ckeditor
                placeholder="hello d"
                v-model="biography"
                :editor="ClassicEditor"
                :config="{}"
            />
        </div>
        <div class="flex w-full">
            <el-button type="primary" @click="handleSubmit">Register</el-button>
            <el-button>Back</el-button>
        </div>
        <div v-if="errorMessage" class="text-red-500">{{ errorMessage }}</div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import store from '@/store'
import { registerInstructor } from '@/api/modules/auth'
import { showToast } from '@/utils/toastHelper'
import { ToastType } from '@/types'

const router = useRouter()
const biography = ref('')
const avatarFile = ref()
const avatarPreviewSrc = ref(
    import.meta.env.VITE_API_BASE_URL + store.state.auth.user?.profile_photo_url ??
        'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
)
const errorMessage = ref('')

const updateAvatarPreview = () => {
    const file = avatarFile.value.files[0]
    // Validate avatar file size
    if (file.size > 2 * 1024 * 1024) {
        // 2 MB
        errorMessage.value = 'Avatar file size should not exceed 2 MB.'
        return
    }

    if (file) {
        const reader = new FileReader()
        reader.onload = (e: any) => {
            avatarPreviewSrc.value = e.target.result as string
        }
        reader.readAsDataURL(file)
    }
}

const handleSubmit = async () => {
    errorMessage.value = ''

    // Validate biography
    if (!biography.value.trim()) {
        errorMessage.value = 'Biography is required.'
        return
    }

    // Validate avatar file is selected
    const file = avatarFile.value.files[0]
    if (!file && !store.state.auth.user?.profile_photo_url) {
        errorMessage.value = 'Avatar is required.'
        return
    }

    // Validate avatar file size
    if (file && file.size > 2 * 1024 * 1024) {
        // 2 MB
        errorMessage.value = 'Avatar file size should not exceed 2 MB.'
        return
    }

    const formData = new FormData()
    formData.append('biography', biography.value)

    if (file) {
        console.log('have file')
        formData.append('avatar', file)
    }

    try {
        const response = await registerInstructor(formData)
        console.log('Form submitted successfully', response.data)
        showToast(response.message, ToastType.SUCCESS)
        router.push({ name: 'instructor-dashboard' })
    } catch (error) {
        console.error('Error submitting form', error)
        errorMessage.value = 'Error submitting form. Please try again later.'
    }
}
</script>
