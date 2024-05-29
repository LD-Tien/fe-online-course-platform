<template>
    <div class="flex flex-col gap-2">
        <video
            :src="videoUrl"
            class="w-full"
            ref="videoPlayer"
            @loadeddata="handleSetCurrentTime($event)"
            controls
        />
        <div class="flex flex-col gap-3 p-3">
            <h3 class="text-2xl font-bold">{{ props.lesson?.name }}</h3>
            <Ckeditor
                :editor="ClassicEditor"
                v-model="description"
                :config="{
                    toolbar: []
                }"
            />
        </div>
    </div>
</template>
<script setup lang="ts">
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

const props = defineProps(['lesson', 'currentTime'])
const route = useRoute()
const videoPlayer = ref()
const videoUrl = ref('')
const description = computed(() => {
    return props.lesson.description
})

watch(props, (currentTime) => {
    console.log(currentTime)
    if (videoPlayer.value) {
        videoPlayer.value.currentTime = props.currentTime
    }
})

watch(
    () => props.lesson.id,
    () => {
        console.log(props.lesson)
        fetch(`http://127.0.0.1:8000/api/${props.lesson.id}/video`)
            .then((response) => response.blob())
            .then((blob) => {
                videoUrl.value = URL.createObjectURL(blob)
            })
            .catch((error) => {
                console.error('Error fetching video:', error)
            })
    }
)

watch(
    () => route.params,
    (params) => {
        if (params.currentTime) {
            videoPlayer.value.currentTime = parseInt(params.currentTime as string)
        }
    }
)

const handleSetCurrentTime = (event: Event) => {
    if (route.params.currentTime) {
        videoPlayer.value.currentTime = route.params.currentTime
    }
}
</script>
