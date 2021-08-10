<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <!-- 添加分类框 -->
      <el-row>
        <el-col>
          <el-button type="primary" class="add-role" @click="showAddCateDialog"
            >添加分类</el-button
          >
        </el-col>
      </el-row>
      <!-- 表格区域 -->
      <el-table
        :data="cateList"
        style="width: 100%; margin-bottom: 20px"
        row-key="cat_id"
        border
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column prop="cat_name" label="分类名称"> </el-table-column>
        <el-table-column prop="cat_deleted" label="是否有效">
          <template slot-scope="scope">
            <i
              v-if="!scope.row.cat_deleted"
              class="el-icon-success"
              style="color: rgb(9, 128, 9)"
            ></i>
            <i v-else class="el-icon-error" style="color: rgb(128, 3, 3)"></i>
          </template>
        </el-table-column>
        <el-table-column prop="cat_level" label="排序">
          <template slot-scope="scope">
            <el-tag size="mini" v-if="scope.row.cat_level === 0">一级</el-tag>
            <el-tag
              type="success"
              size="mini"
              v-else-if="scope.row.cat_level === 1"
              >二级</el-tag
            >
            <el-tag type="warning" size="mini" v-else>三级</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 编辑按钮 -->
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="showEditCateDialog(scope.row.cat_id)"
              >编辑</el-button
            >
            <!-- 删除按钮 -->
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="removeCateById(scope.row.cat_id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[3, 5, 10, 15]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <!-- 添加分类的对话框 -->
    <el-dialog
      title="添加分类"
      :visible.sync="addCateDialogVisible"
      width="50%"
      @close="addCateDialogClosed"
    >
      <!-- 内容主体 -->
      <el-form
        :model="addCateForm"
        :rules="addCateFormRules"
        ref="addCateFormRef"
        label-width="100px"
      >
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="addCateForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类">
          <el-cascader
            v-model="selectedId"
            :options="parentCateList"
            :props="cascaderProps"
            @change="parentCateChange"
            clearable
          ></el-cascader>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCate"> 确 定 </el-button>
      </span>
    </el-dialog>
    <!-- 修改分类的对话框 -->
    <el-dialog
      title="修改分类"
      :visible.sync="editCateDialogVisible"
      width="50%"
    >
      <!-- 内容主体 -->
      <el-form
        :model="editCateForm"
        :rules="addCateFormRules"
        ref="editCateFormRef"
        label-width="100px"
      >
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="editCateForm.cat_name"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editCate"> 确 定 </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getCateListInfo,
  postNewCate,
  getCateById,
  putNewCateName,
  deleteCateName,
} from "network/goods";
export default {
  data() {
    return {
      // 商品分类的数据列表
      cateList: [],
      // 查询条件
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5,
      },
      // 总数据条数
      total: 0,
      // 控制添加分类对话框的显示与隐藏
      addCateDialogVisible: false,
      // 添加分类的表单对象
      addCateForm: {
        cat_name: "",
        cat_pid: 0,
        cat_level: 0,
      },
      // 添加分类表单的验证规则对象
      addCateFormRules: {
        cat_name: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
        ],
      },
      // 父级分类的列表
      parentCateList: [],
      // 指定级联选择器的配置对象
      cascaderProps: {
        expandTrigger: "hover",
        value: "cat_id",
        label: "cat_name",
        children: "children",
        // checkStrictly: true,
      },
      // 选中的父级分类id数组
      selectedId: [],
      // 控制修改分类对话框的显示与隐藏
      editCateDialogVisible: false,
      // 修改分类的表单对象
      editCateForm: {
        cat_name: "",
      },
      // 选中项的id
      selectedCateId: "",
    };
  },
  created() {
    this.getCateList();
  },
  methods: {
    // 获取商品分类
    async getCateList() {
      const { data: res } = await getCateListInfo(this.queryInfo);
      if (res.meta.status !== 200) {
        return this.$message.error("获取商品分类失败");
      }
      this.cateList = res.data.result;
      this.total = res.data.total;
    },
    // 监听pagesize改变
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getCateList();
    },
    // 监听pagenum改变
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getCateList();
    },
    // 点击按钮，显示添加分类对话框
    showAddCateDialog() {
      this.addCateDialogVisible = true;
      this.getParentCateList();
    },
    // 获取父级分类的数据列表
    async getParentCateList() {
      const { data: res } = await getCateListInfo({
        type: 2,
      });
      if (res.meta.status !== 200) {
        return this.$message.error("获取父级分类数据失败");
      }
      this.parentCateList = res.data;
    },
    // 选择项发生变化
    parentCateChange() {
      console.log(this.selectedId);
      // 如果selectedId长度等于0，表示没选中
      if (!this.selectedId.length) {
        this.addCateForm.cat_pid = 0;
        this.addCateForm.cat_level = 0;
      } else {
        this.addCateForm.cat_pid = this.selectedId[this.selectedId.length - 1];
        this.addCateForm.cat_level = this.selectedId.length;
      }
    },
    // 点击按钮，添加新分类
    addCate() {
      this.$refs.addCateFormRef.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await postNewCate(this.addCateForm);
        if (res.meta.status !== 201) {
          return this.$message.error("添加分类失败");
        }
        this.getCateList();
        this.addCateDialogVisible = false;
        this.$message.success("添加分类成功");
      });
    },
    // 监听添加分类对话框的关闭
    addCateDialogClosed() {
      this.$refs.addCateFormRef.resetFields();
      this.selectedId = [];
    },
    // 点击编辑按钮，编辑分类名称
    async showEditCateDialog(id) {
      // 保存选中项的id
      this.selectedCateId = id;
      // 打开修改分类对话框
      this.editCateDialogVisible = true;
      // 获取分类名称
      const { data: res } = await getCateById(id);
      if (res.meta.status !== 200) {
        this.$message.error("获取名称失败");
      }
      this.editCateForm.cat_name = res.data.cat_name;
    },
    // 点击确定按钮，将修改分类信息提交
    editCate() {
      this.$refs.editCateFormRef.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await putNewCateName(
          this.selectedCateId,
          this.editCateForm
        );
        console.log(res);
        if (res.meta.status !== 200) {
          return this.$message.error("修改分类名称失败");
        }
        // 刷新数据
        this.getCateList();
        this.editCateDialogVisible = false;
        this.$message.success("修改分类名称成功");
      });
    },
    // 根据id删除分类
    async removeCateById(id) {
      // 弹框询问是否删除
      const confirmRes = await this.$confirm(
        "此操作将永久删除该分类, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      // 取消删除，res 为canle字符串
      // 确定删除，res 为confirm字符串
      if (confirmRes !== "confirm") {
        return this.$message.info("取消删除");
      }
      const { data: res } = await deleteCateName(id);
      if (res.meta.status !== 200) {
        return this.$message.error("删除分类名称失败");
      }
      // 更新数据
      this.getCateList();
      this.$message.success("删除分类名称成功");
    },
  },
};
</script>

<style lang="less" scoped>
.add-role {
  background-color: #7b99be;
  border-color: #7b99be;
}
.el-cascader {
  width: 100%;
}
</style>