<template>
    <div class="flex h-screen">
        <instructor-sidebar />
        <div class="flex flex-col w-full overflow-auto">
            <instructor-header />
            <router-view />
        </div>
    </div>
</template>
