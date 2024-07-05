<template>
    <learn-layout v-slot="{ lesson, videoUrl }: { lesson: Lesson; videoUrl: string }">
        <div class="flex flex-col flex-1 overflow-auto">
            <video
                :src="videoUrl"
                class="bg-black-100"
                type="video/mp4"
                controls
                style="width: 100%; height: 500px"
            />
            <div class="flex flex-col gap-3 p-6">
                <div class="flex items-center justify-between">
                    <h1 class="text-xl font-bold">{{ lesson.name }}</h1>
                    <el-badge :value="comments.length" class="item" type="warning">
                        <el-button type="primary" @click="handleOpenDrawer(lesson.id)">
                            Thảo luận
                        </el-button>
                    </el-badge>
                </div>
                <span v-html="lesson?.description"></span>
            </div>
        </div>
        <el-drawer v-model="drawer" size="40%" title="I am the title" :with-header="false">
            <div v-if="isLoadingComment" class="flex items-center justify-center h-screen">
                <el-icon class="is-loading" color="var(--el-color-primary)" :size="26">
                    <loading />
                </el-icon>
            </div>
            <div v-else class="flex flex-col gap-3">
                <el-input
                    v-model="commentData.content"
                    :rows="2"
                    type="textarea"
                    placeholder="Nhập câu hỏi của bạn"
                />
                <el-button
                    @click.stop="handleAddComment(lesson.id)"
                    :loading="isLoadingHandleAddComment"
                    :disabled="!commentData.content || commentData.content.trim() === ''"
                >
                    Thêm Câu Hỏi
                </el-button>
                <div class="flex flex-col gap-3">
                    <div class="flex flex-col items-start w-full gap-2">
                        <div
                            v-for="comment in comments"
                            :key="comment.id"
                            class="flex items-start w-full gap-2 p-3 rounded-lg bg-gray-25"
                        >
                            <div class="flex flex-col items-center">
                                <el-avatar
                                    :size="35"
                                    :src="comment.user.profile_photo_url ?? ''"
                                    class="flex-none"
                                />
                                <span class="text-sm font-medium">{{ comment.rating_number }}</span>
                                <span class="text-xs text-nowrap">Hữu ích</span>
                            </div>
                            <div class="flex flex-col justify-start w-full gap-3">
                                <div class="flex flex-col">
                                    <div class="flex justify-between">
                                        <span class="flex-1 text-sm font-medium">
                                            {{
                                                comment.user.id === store.state.auth.user?.id
                                                    ? 'You'
                                                    : comment.user.name
                                            }}
                                        </span>
                                        <el-popconfirm
                                            title="Are you sure to delete this?"
                                            @confirm.stop="handleDeleteComment(comment)"
                                        >
                                            <template #reference>
                                                <el-button
                                                    size="small"
                                                    type="danger"
                                                    link
                                                    :icon="Delete"
                                                    v-if="
                                                        comment.user.id ===
                                                        store.state.auth.user?.id
                                                    "
                                                />
                                            </template>
                                        </el-popconfirm>
                                    </div>
                                    <span class="text-xs font-extralight">
                                        {{ dayjs(comment.updated_at).fromNow(true) }}
                                    </span>
                                    <p class="text-sm font-normal">
                                        {{ comment.content }}
                                    </p>
                                    <div class="flex items-center">
                                        <el-button
                                            @click.stop="handleReactionComment(1, comment)"
                                            :icon="ArrowUpBold"
                                            :type="
                                                comment.user_reaction_comment === 1
                                                    ? 'primary'
                                                    : 'default'
                                            "
                                            size="small"
                                            circle
                                            plain
                                            v-if="comment.user.id !== store.state.auth.user?.id"
                                        />
                                        <el-button
                                            :icon="ArrowDownBold"
                                            size="small"
                                            :type="
                                                comment.user_reaction_comment === 0
                                                    ? 'primary'
                                                    : 'default'
                                            "
                                            plain
                                            circle
                                            @click.stop="handleReactionComment(0, comment)"
                                            v-if="comment.user.id !== store.state.auth.user?.id"
                                        />
                                        <el-button
                                            @click.stop="handleShowInputReply(comment)"
                                            class="self-start"
                                            size="small"
                                            link
                                            type="primary"
                                        >
                                            Trả lời
                                        </el-button>
                                    </div>
                                    <el-input
                                        v-show="comment.id === showInputReply"
                                        v-model="replyData.content"
                                        :rows="2"
                                        type="textarea"
                                        placeholder="Nhập câu trả lời"
                                        class="mt-1"
                                    />
                                    <div class="flex gap-1 mt-1">
                                        <el-button
                                            @click.stop="handleAddReply(replyData.lesson_id)"
                                            type="primary"
                                            :loading="isLoadingHandleAddReply"
                                            :disabled="
                                                !replyData.content ||
                                                replyData.content.trim() === ''
                                            "
                                            v-show="comment.id === showInputReply"
                                        >
                                            Thêm Câu Trả Lời
                                        </el-button>
                                        <el-button
                                            @click.stop="showInputReply = 0"
                                            v-show="comment.id === showInputReply"
                                        >
                                            Hủy
                                        </el-button>
                                    </div>
                                </div>
                                <div
                                    v-for="reply in comment.replies"
                                    :key="reply.id"
                                    class="flex items-start gap-2 p-3 rounded-lg bg-gray-75"
                                >
                                    <div class="flex flex-col items-center">
                                        <el-avatar
                                            :size="35"
                                            :src="reply.user.profile_photo_url ?? ''"
                                            class="flex-none"
                                        />
                                        <span class="text-sm font-medium">
                                            {{ reply.rating_number }}
                                        </span>
                                        <span class="text-xs text-nowrap">Hữu ích</span>
                                    </div>
                                    <div class="flex flex-col justify-start w-full">
                                        <div class="flex justify-between">
                                            <span class="flex-1 text-sm font-medium">
                                                {{
                                                    reply.user.id === store.state.auth.user?.id
                                                        ? 'Bạn'
                                                        : reply.user.name
                                                }}
                                            </span>
                                            <el-popconfirm
                                                title="Are you sure to delete this?"
                                                @confirm.stop="handleDeleteComment(reply)"
                                            >
                                                <template #reference>
                                                    <el-button
                                                        size="small"
                                                        type="danger"
                                                        link
                                                        :icon="Delete"
                                                        v-if="
                                                            reply.user.id ===
                                                            store.state.auth.user?.id
                                                        "
                                                    />
                                                </template>
                                            </el-popconfirm>
                                        </div>
                                        <span class="text-xs font-extralight">
                                            {{ dayjs(reply.updated_at).fromNow(true) }}
                                        </span>
                                        <p class="text-sm font-normal">
                                            {{ reply.content }}
                                        </p>
                                        <div class="flex items-center">
                                            <el-button
                                                @click.stop="handleReactionComment(1, reply)"
                                                :icon="ArrowUpBold"
                                                :type="
                                                    reply.user_reaction_comment === 1
                                                        ? 'primary'
                                                        : 'default'
                                                "
                                                plain
                                                circle
                                                size="small"
                                                v-if="reply.user.id !== store.state.auth.user?.id"
                                            />
                                            <el-button
                                                @click.stop="handleReactionComment(0, reply)"
                                                :icon="ArrowDownBold"
                                                :type="
                                                    reply.user_reaction_comment === 0
                                                        ? 'primary'
                                                        : 'default'
                                                "
                                                plain
                                                circle
                                                size="small"
                                                v-if="reply.user.id !== store.state.auth.user?.id"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </el-drawer>
    </learn-layout>
</template>

<script setup lang="ts">
import type { Lesson } from '@/api/modules/common/course/types'
import { comment } from '@/api/modules/learner/comment'
import type {
    Comment,
    CreateCommentRequest,
    ReactionType
} from '@/api/modules/learner/comment/types'
import store from '@/store'
import { ArrowDownBold, ArrowUpBold, Delete } from '@element-plus/icons-vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import vi from 'dayjs/locale/vi'

dayjs.locale(vi)
dayjs.extend(relativeTime)

const drawer = ref(false)
const comments = ref<Comment[]>([])
const showInputReply = ref(0)
const commentData = reactive({}) as CreateCommentRequest
const replyData = reactive({}) as CreateCommentRequest
const isLoadingComment = ref(false)
const isLoadingHandleAddReply = ref(false)
const isLoadingHandleAddComment = ref(false)

const route = useRoute()

watch(
    () => route.query.lessonId,
    (lessonId) => {
        getListComment(parseInt(lessonId as string))
    }
)

const handleOpenDrawer = async (lessonId: number) => {
    drawer.value = true
    isLoadingComment.value = true
    await getListComment(lessonId)
    isLoadingComment.value = false
}

const handleShowInputReply = (comment: Comment) => {
    showInputReply.value = comment.id
    replyData.content = ''
    replyData.lesson_id = comment.lesson_id
    replyData.parent_comment_id = comment.id
}

const handleAddReply = async (lessonId: number) => {
    isLoadingHandleAddReply.value = true
    await comment.create(replyData)
    await getListComment(lessonId)
    showInputReply.value = 0
    isLoadingHandleAddReply.value = false
}

const handleAddComment = async (lessonId: number) => {
    isLoadingHandleAddComment.value = true
    commentData.lesson_id = lessonId
    await comment.create(commentData)
    await getListComment(lessonId)
    showInputReply.value = 0
    commentData.content = ''
    isLoadingHandleAddComment.value = false
}

const handleReactionComment = async (reactionType: ReactionType, commentData: Comment) => {
    await comment.reaction({ reaction_type: reactionType, comment_id: commentData.id })
    await getListComment(commentData.lesson_id)
}

const handleDeleteComment = async (commentData: Comment) => {
    await comment.delete(commentData.id)
    await getListComment(commentData.lesson_id)
}

const getListComment = async (lessonId: number) => {
    const res = await comment.list({
        filters: {
            lesson_id: lessonId
        }
    })
    comments.value = res.data.sort((a, b) => {
        a?.replies && a.replies.sort((a, b) => b.rating_number - a.rating_number)
        b?.replies && b.replies.sort((a, b) => b.rating_number - a.rating_number)
        return b.rating_number - a.rating_number
    })
}

onMounted(async () => {
    await getListComment(parseInt(route.query.lessonId as string))
})
</script>
