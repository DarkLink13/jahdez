<template>
  <u-container>
    <u-card class="w-full">
      <template #header>
        <b-edit :refresh="refresh">
          <template #button="{ click }">
            <u-button
              :label="$t('api.node.form.create.label')"
              @click="click"
            />
          </template>
        </b-edit>
      </template>
      <u-table :rows="data ?? []" :columns="columns" class="w-full h-full">
        <template #actions-data="{ row }">
          <div class="flex flex-row">
            <b-edit :refresh="refresh" v-model="newValue" edit disabled>
              <template #button="{ click }">
                <u-button
                  icon="i-fluent-eye-32-regular"
                  variant="ghost"
                  @click="() => (click(), fetchNode(row.id))"
                />
              </template>
            </b-edit>
            <b-edit :refresh="refresh" v-model="newValue" :id="row.id" edit>
              <template #button="{ click }">
                <u-button
                  icon="i-fluent-edit-32-regular"
                  variant="ghost"
                  @click="() => (click(), fetchNode(row.id))"
                />
              </template>
            </b-edit>
            <u-button
              icon="i-fluent-delete-32-regular"
              color="red"
              variant="ghost"
              @click="deleteNode(row.id)"
            />
          </div>
        </template>
      </u-table>
      <template #footer>
        <u-pagination :max="5" :page-count="5" :total="100" :model-value="1" />
      </template>
    </u-card>
  </u-container>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: "auth",
});

const { data, refresh } = useFetch<INode[]>("/api/node");
const fetchNode = async (id: string) => {
  const nodes = await $fetch(`/api/node/${id}`);
  newValue.value = nodes;
};
const deleteNode = (id: string) => {
  useFetch(`/api/node/${id}`, { method: "DELETE" }).then(() => {
    refresh();
  });
};

const newValue = ref<INode | null>({ item: { type: NodeItemType.Default } });

const columns = [
  { key: "item.label.en", label: "Label" },
  { key: "item.type", label: "Type" },
  { key: "children.length", label: "Childrens" },
  { key: "actions", label: "Actions" },
];
</script>
