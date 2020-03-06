<template>
  <div>
    <h3 style="margin:0rem 0rem 2rem 0.5rem;">{{option.title }}</h3>
    <avue-crud
      v-if="option.column"
      :data="data.data"
      :page="page"
      :option="option"
      @row-save="create"
      @row-update="update"
      @row-del="remove"
      @on-load="changePage"
      @sort-change="changeSort"
      @search-change="search"
    ></avue-crud>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component({})
export default class ResourceList extends Vue {
  @Prop(String) resource!: string;
  data = {};
  option = {};
  page = {
    total: 0
    // pageSize: 5,
    // pageSizes: [5, 10, 15, 20]
  };
  query = {
    limit: 2,
    page: 1,
    sort: {},
    where: ""
  };
  async changePage({ pageSize, currentPage }) {
    this.query.page = currentPage;
    this.query.limit = pageSize;
    this.fecth();
  }
  async changeSort({ prop, order }) {
    if (!order) {
      this.query.sort = {};
    } else {
      this.query.sort = {
        [prop]: order === "ascending" ? 1 : -1
      };
    }
    this.fecth();
  }
  async search(where, done) {
    // if ( k in where) {
    //   const field = this.option.column.find(v => v.prop === k);
    //   if (field.regex) {
    //     where[k] = { $regex: where[k] };
    //   }
    // }
    where.name = { $regex: where.name };
    this.query.where = where;
    this.fecth();
    done();
  }
  async fecth() {
    const res = await this.$http.get(`${this.resource}`, {
      params: {
        query: this.query
      }
    });
    this.page.total = res.data.total;
    this.data = res.data;
  }
  async fecthOption() {
    const res = await this.$http.get(`/${this.resource}/option`);
    this.option = res.data;
  }
  async create(row, done) {
    await this.$http.post(`${this.resource}`, row);
    this.$message.success("创建成功");
    this.fecth();
    done();
  }
  async update(row, index, done) {
    const data = JSON.parse(JSON.stringify(row));
    delete data.$index;
    await this.$http.put(`/${this.resource}/${row._id}`, data);
    this.$message.success("修改成功");
    this.fecth();
    done();
  }
  async remove(row) {
    try {
      await this.$confirm("是否确认删除？");
    } catch (error) {
      return;
    }
    await this.$http.delete(`/${this.resource}/${row._id}`);
    this.$message.success("删除成功");
    this.fecth();
  }
  created() {
    this.fecth();
    this.fecthOption();
  }
}
</script>

<style></style>
