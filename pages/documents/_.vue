<template>
  <div>
    <NavComponent />
    <div v-if="false">
      <div class="legal-header !pt-24">
        <div>Filesystem</div>
        <div class="header-underline show"></div>
      </div>

      <div class="post-body !mt-[30px]">
        <!-- Breadcrumb -->
        <div class="p-2 bg-gray-200 rounded-sm">
          <template v-for="(item, index) in breadcrumb">
            <nuxt-link
              :key="index"
              class="hover:underline text-[#004010]"
              :to="item.path"
              @click="routeFolders(index)"
            >
              {{ item.name | capitalize }}
            </nuxt-link>
            <span
              v-if="index + 1 != breadcrumb.length"
              :key="$generateAlphaNum(index)"
              class="mx-1"
            >
              <!-- This the breadcrumb separator -->/
            </span>
          </template>
        </div>

        <!-- Folder/File Tree -->
        <div class="py-4 min-h-[50vh]">
          <div class="flex flex-wrap-reverse w-full">
            <div class="w-full md:w-1/2 md:pr-4">
              <div class="border-b py-2">
                Folder(s)
              </div>
              <div v-if="folders.length > 0">
                <nuxt-link
                  v-for="(folder, index) in folders"
                  :key="index"
                  class="group flex p-3 hover:bg-gray-300"
                  :class="{
                    'bg-gray-100': index % 2 == 0,
                    'bg-gray-200': index % 2 == 1
                  }"
                  :to="$route.path + '/' + folder.name"
                >
                  <FolderIconSVG />
                  <span class="group:hover:underline">{{ folder.name }}</span>
                  <span class="text-gray-400 ml-auto">
                    {{ $formatDateTime(folder.createdAt) }}
                  </span>
                </nuxt-link>
              </div>
              <div v-else class="m-16">
                <FolderIconSVG :size="45" />
                <div>
                  <span class="font-medium">
                    {{ lastPath | capitalize }}
                  </span>
                  has no sub-folders
                </div>
              </div>
            </div>
            <div class="w-full md:w-1/2 md:pl-4">
              <div class="border-b py-2">
                File(s)
              </div>
              <div class="">
                <div v-if="files.length > 0">
                  <div
                    v-for="(file, index) in files"
                    :key="index"
                    class="group p-2 flex cursor-pointer hover:bg-gray-300"
                    :class="{
                      'bg-gray-100': index % 2 == 0,
                      'bg-gray-200': index % 2 == 1
                    }"
                    @click="fetchBlob(file.url, file.name)"
                  >
                    <div class="mr-auto">
                      <FileIconSVG />
                      <span class="group:hover:underline">
                        {{ file.name }}
                      </span>
                      <span class="text-gray-400 ml-1">
                        ・{{ file.size }}kb
                      </span>
                    </div>
                    <div class="rounded-full p-1 group-hover:bg-gray-100">
                      <DownloadIconSVG />
                    </div>
                  </div>
                </div>
                <div v-else class="m-16">
                  <FileIconSVG :size="45" />
                  <div>
                    <span class="font-medium">
                      {{ lastPath | capitalize }}
                    </span>
                    has no files
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="file-system_section">
      <div class="section-heading no-border">
        File System
      </div>
      <div class="file-system_heading">
        <div class="subheading-text__inner no-border no-padding">
          <template v-for="(item, index) in breadcrumb">
            <nuxt-link
              :key="index"
              class="breadcrumb-link"
              :to="item.path"
              @click="routeFolders(index)"
            >
              {{ item.name | capitalize }}
            </nuxt-link>
            <span
              v-if="index + 1 != breadcrumb.length"
              :key="$generateAlphaNum(index)"
              class="mx-1"
            >
              <!-- This the breadcrumb separator -->/
            </span>
          </template>
        </div>
      </div>
      <br />
      <br />
      <br />
      <div class="subheading-text__inner no-border no-padding">
        Folder(s)
      </div>

      <div v-show="folders.length > 0" class="folders-flex">
        <template v-for="(folder, index) in folders">
          <nuxt-link
            :key="index"
            class="folders-block w-inline-block"
            :to="$route.path + '/' + folder.name"
          >
            <div class="folders-block_text">
              <div>Created {{ $formatDateTime(folder.createdAt) }}</div>
              <!-- <div>4 Files | 100MB</div> -->
            </div>
            <div class="folders-img_block">
              <img
                alt=""
                class="folder-img"
                loading="lazy"
                src="@/static/assets/images/folder-img.svg"
              />
            </div>
            <div class="folders-text_block">
              <div>{{ folder.name | capitalize }}</div>
            </div>
          </nuxt-link>
        </template>
      </div>
      <div v-if="folders.length === 0" class="file-system_empty">
        <img
          alt="empty-stater-folder"
          class="folder-img"
          loading="lazy"
          src="@/static/assets/images/folder-img.svg"
        />
        <div class="empty-state_text">
          There are no folders in this folder
        </div>
      </div>
      <br />
      <br />
      <br />
      <div>
        <div class="subheading-text__inner no-border no-padding">
          File(s)
        </div>
      </div>
      <div v-if="files.length > 0" class="file-system_table">
        <div class="table-header">
          <div id="w-node-_7d0ec8ec-045f-d01c-7379-7015139ab3b2-c677d6fe">
            File Name
          </div>
          <div id="w-node-_9afb93c8-e833-29be-9b88-ab33d2cb246d-c677d6fe">
            Date Created
          </div>
        </div>
        <div
          v-for="(file, index) in files"
          :key="index"
          class="table-entry"
          :class="{
            'white-smoke_bg': index % 2 == 1
          }"
          @click.prevent.stop="openFile(file.url)"
        >
          <div
            id="w-node-_73069c3f-b7ea-dec8-e619-49e11d803a7e-c677d6fe"
            class="table-entry_flex"
          >
            <div
              id="w-node-_3151511c-1974-4719-8ad0-4e83927902e9-c677d6fe"
              class="table-img"
            ></div>
            <div>{{ file.name }}</div>
          </div>
          <div
            id="w-node-_8d535b37-47ea-de9e-ce35-f4597e008249-c677d6fe"
            class="table-entry_text"
          >
            Created {{ $formatDateTime(file.createdAt) }}
          </div>
          <div
            id="w-node-e33ca975-5f17-6fff-7ed0-9b616ad85f05-c677d6fe"
            class="button-flex"
          >
            <button
              id="w-node-_74f5e0dc-3536-271b-f6ad-f5df173be1ab-c677d6fe"
              class="button secondary-blue small w-inline-block"
              @click.prevent.stop="openFile(file.url)"
            >
              <div>Open</div>
            </button>
            <button
              class="button-icon"
              @click.prevent.stop="fetchBlob(file.url, file.name)"
            />
          </div>
        </div>
      </div>
      <div v-else class="file-system_empty">
        <img
          alt="empty state files"
          class="empty-state_img"
          loading="lazy"
          src="@/static/assets/images/empty-state-img.svg"
        />
        <div class="empty-state_text">
          There are no files in this folder
        </div>
      </div>
    </div>
    <div class="footer-wrapper">
      <FooterComponent />
    </div>
  </div>
</template>

<script>
import { notFoundError, removeEmptyValues } from '~/commons/utils'
export default {
  async asyncData({ params, $axios, error }) {
    let lastPath = params.pathMatch.split('/').pop()
    lastPath = lastPath === '' ? 'documents' : lastPath
    const response = await $axios.$get('/fs/' + lastPath)
    const { files, children: folders } = response
files.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))

    if (response) {
      return { files, folders, lastPath }
    } else {
      error(notFoundError())
    }
  },

  data() {
    return {
      loading: false,
      breadcrumb: []
    }
  },

  head() {
    return {
      title: 'NNPC LTD | Filesystem - ' + this.lastPath,
      meta: [...this.meta]
    }
  },

  computed: {
    siteURL() {
      return process.env.siteURL
    },

    meta() {
      return this.mxMetaUtils({
        description: this.mxDescription,
        url: `${process.env.siteURL}/documents`
      })
    }
  },

  mounted() {
    this.populateBreadcrumb()
  },

  methods: {
    populateBreadcrumb() {
      const _folders = removeEmptyValues(
        decodeURI(this.$route.fullPath).split('/')
      )

      for (let i = 0; i < _folders.length; i++) {
        this.breadcrumb.push({
          name: _folders[i],
          path: `/${_folders.slice(0, i + 1).join('/')}`
        })
      }
    },

    downloadBlob(response, title) {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', title)
      document.body.appendChild(link)
      link.click()
      link.remove()
    },

    fetchBlob(url, title) {
      this.$axios({
        method: 'get',
        url: this.mxMediaUrl + url,
        responseType: 'arraybuffer'
      }).then((response) => {
        this.downloadBlob(response, title)
      })
    },

    openFile(_file) {
      console.log(_file)
      const _url = this.mxMediaUrl + _file
      console.log(_url)
      window.open(_url, '_blank')
    }
  }
}
</script>

<style scoped>

.table-entry{
  cursor:pointer
}
.folders-flex {
  justify-content: flex-start;
}
</style>
