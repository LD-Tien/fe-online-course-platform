<template>
    <div class="flex w-screen">
        <div class="p-2"><admin-sidebar /></div>
        <div class="flex flex-col w-full">
            <div class="w-full">
                <admin-header />
            </div>
            <main class="p-2">
                <router-view />
            </main>
        </div>
    </div>
</template>
