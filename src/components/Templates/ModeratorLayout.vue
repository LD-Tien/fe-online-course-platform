<template>
    <div class="flex h-screen">
        <moderator-sidebar />
        <div class="flex flex-col w-full overflow-auto">
            <moderator-header />
            <router-view />
        </div>
    </div>
</template>
