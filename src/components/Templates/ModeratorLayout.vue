<template>
    <div class="flex h-screen overflow-hidden">
        <div class="min-w-[250px]">
            <moderator-sidebar />
        </div>
        <div class="relative overflow-x-auto grow">
            <div class="sticky top-0 z-10">
                <moderator-header />
            </div>
            <main>
                <router-view />
            </main>
        </div>
    </div>
</template>
