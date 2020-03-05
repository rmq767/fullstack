<template>
  <div>
    <h3>{{ isNew ? "创建" : "编辑" }}课程</h3>
    <ele-form
      :form-data="data"
      :form-desc="fields"
      :request-fn="submit"
    ></ele-form>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component({})
export default class CourseList extends Vue {
  @Prop(String) id!: string;
  data = {};
  fields = {
    name: { label: "课程名称", type: "input" },
    cover: { label: "课程封面图", type: "input" }
  };
  get isNew() {
    return !this.id;
  }
  async fecth() {
    const res = await this.$http.get(`/courses/${this.id}`);
    this.data = res.data;
  }
  async submit(data: any) {
    this.data = {};
    const url = this.isNew ? "courses" : `courses/${this.id}`;
    const method = this.isNew ? "post" : "put";
    await this.$http[method](url, data);
    this.isNew
      ? this.$message.success("创建成功")
      : this.$message.success("修改成功");
    this.$router.go(-1);
  }
  created() {
    !this.isNew && this.fecth(); //判断是否是创建
  }
}
</script>

<style></style>
