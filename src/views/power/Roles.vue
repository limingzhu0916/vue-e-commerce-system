<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <!-- 添加角色框 -->
      <el-row class="add-role">
        <el-col>
          <el-button type="primary" @click="addRoleDialogVisible = true"
            >添加角色</el-button
          >
        </el-col>
      </el-row>
      <!-- 角色列表 -->
      <el-table :data="roleList" border stripe>
        <!-- 展开列 -->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row
              :class="['bdbottom', index === 0 ? 'bdtop' : '', 'vcenter']"
              v-for="(item1, index) in scope.row.children"
              :key="item1.id"
            >
              <!-- 一级权限 -->
              <el-col :span="5">
                <el-tag
                  closable
                  @close="removeRightById(scope.row, item1.id)"
                  >{{ item1.authName }}</el-tag
                >
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 二级、三级权限 -->
              <el-col :span="19">
                <el-row
                  :class="[index === 0 ? '' : 'bdtop', 'vcenter']"
                  v-for="(item2, index) in item1.children"
                  :key="item2.id"
                >
                  <!-- 二级权限 -->
                  <el-col :span="6">
                    <el-tag
                      type="success"
                      closable
                      @close="removeRightById(scope.row, item2.id)"
                      >{{ item2.authName }}</el-tag
                    >
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <!-- 三级权限 -->
                  <el-col :span="18">
                    <el-tag
                      type="warning"
                      v-for="item3 in item2.children"
                      :key="item3.id"
                      closable
                      @close="removeRightById(scope.row, item3.id)"
                      >{{ item3.authName }}</el-tag
                    >
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <!-- 索引列 -->
        <el-table-column type="index"></el-table-column>
        <el-table-column label="角色" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <!-- 编辑按钮 -->
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="showRoleEditDialog(scope.row.id)"
              >编辑</el-button
            >
            <!-- 删除按钮 -->
            <el-button size="mini" type="danger" icon="el-icon-delete"
              >删除</el-button
            >
            <!-- 设置角色按钮 -->
            <el-button
              size="mini"
              type="warning"
              icon="el-icon-setting"
              @click="showSetRightDialog(scope.row)"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 添加角色的对话框 -->
      <el-dialog
        title="添加角色"
        :visible.sync="addRoleDialogVisible"
        width="50%"
        @close="addRoleDialogClosed"
      >
        <!-- 内容主体 -->
        <el-form
          :model="addRolesFrom"
          :rules="addRolesFromRules"
          ref="addRoleRef"
          label-width="80px"
        >
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="addRolesFrom.roleName"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="roleDesc">
            <el-input v-model="addRolesFrom.roleDesc"></el-input>
          </el-form-item>
        </el-form>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="addRoleDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addRole"> 确 定 </el-button>
        </span>
      </el-dialog>
      <!-- 修改用户的对话框 -->
      <el-dialog
        title="修改角色"
        :visible.sync="editRoleDialogVisible"
        width="50%"
        @close="editRoleDialogClosed"
      >
        <!-- 内容主体 -->
        <el-form
          :model="editRoleForm"
          :rules="addRolesFromRules"
          ref="editRoleFormRef"
          label-width="70px"
        >
          <el-form-item label="角色名称">
            <el-input v-model="editRoleForm.roleName"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="email">
            <el-input v-model="editRoleForm.roleDesc"></el-input>
          </el-form-item>
        </el-form>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="editRoleDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editRoleInfo"> 确 定 </el-button>
        </span>
      </el-dialog>
      <!-- 分配权限的对话框 -->
      <el-dialog
        title="分配权限"
        :visible.sync="setRightDialogVisible"
        width="50%"
        @close="setRightDialogClosed"
      >
        <!-- 内容主体 -->
        <el-tree
          :data="rightsList"
          :props="treeProps"
          show-checkbox
          node-key="id"
          default-expand-all
          :default-checked-keys="defKeys"
          ref="treeRef"
        ></el-tree>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="setRightDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="allotRights"> 确 定 </el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import {
  getAllRights,
  getAllRoles,
  postNewRoleInfo,
  getRoleInfoById,
  putNewRoleInfo,
  deleteRoleRight,
  postRoleRightsInfo,
} from "network/power";
export default {
  data() {
    return {
      // 所有角色列表数据
      roleList: [],
      // 控制添加角色文本框的显示与隐藏
      addRoleDialogVisible: false,
      // 添加角色表单数据
      addRolesFrom: {
        roleName: "",
        roleDesc: "",
      },
      // 表单验证规则
      addRolesFromRules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
        ],
        roleDesc: [
          { required: true, message: "请输入角色描述", trigger: "blur" },
        ],
      },
      // 控制修改角色对话框的显示与隐藏
      editRoleDialogVisible: false,
      // 查询到的角色信息
      editRoleForm: {},
      // 控制分配权限对话框的显示与隐藏
      setRightDialogVisible: false,
      // 所有权限的数据
      rightsList: [],
      // 树形控件的属性绑定对象
      treeProps: {
        children: "children",
        label: "authName",
      },
      // 默认选中的节点id值数组
      defKeys: [],
      // 角色id
      roleId: "",
    };
  },
  created() {
    this.getRoleList();
  },
  methods: {
    // 获取所有角色列表
    async getRoleList() {
      const { data: res } = await getAllRoles();
      if (res.meta.status !== 200) {
        return this.$message.error("请求角色列表失败");
      }
      this.roleList = res.data;
    },
    // 监听添加角色对话框的关闭事件
    addRoleDialogClosed() {
      this.$refs.addRoleRef.resetFields();
    },
    // 点击确定按钮，添加新角色
    addRole() {
      this.$refs.addRoleRef.validate(async (valid) => {
        if (!valid) return;
        // 发起添加新角色的网络请求
        const { data: res } = await postNewRoleInfo(this.addRolesFrom);
        if (res.meta.status !== 201) {
          return this.$message.error("添加角色失败");
        }
        this.$message.success("添加角色成功");
        // 关闭输入框
        this.addRoleDialogVisible = false;
        // 更新数据
        this.getRoleList();
      });
    },
    // 展示修改角色对话框
    async showRoleEditDialog(id) {
      this.editRoleDialogVisible = true;
      // 根据id请求对应的数据
      const { data: res } = await getRoleInfoById(id);
      if (res.meta.status !== 200) {
        return this.$message.error("查询角色信息失败");
      }
      this.editRoleForm = res.data;
    },
    // 监听修改用户对话框的关闭事件
    editRoleDialogClosed() {
      this.$refs.editRoleFormRef.resetFields();
    },
    // 修改角色信息提交
    editRoleInfo() {
      this.$refs.editRoleFormRef.validate(async (valid) => {
        if (!valid) return;
        // 发起角色信息提交网络请求
        const { data: res } = await putNewRoleInfo(
          this.editRoleForm.roleId,
          this.editRoleForm
        );
        if (res.meta.status !== 200) {
          return this.$message.error("更新角色数据失败");
        }
        // 关闭输入框
        this.editRoleDialogVisible = false;
        // 更新数据
        this.getRoleList();
        this.$message.success("更新角色数据成功");
      });
    },
    // 根据Id删除对应的权限
    async removeRightById(row, rightId) {
      // 弹框提示是否删除
      const confirmRes = await this.$confirm(
        "此操作将永久删除该权限, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (confirmRes !== "confirm") {
        return this.$message.info("取消删除");
      }
      // 删除角色指定权限
      const { data: res } = await deleteRoleRight(row.id, rightId);
      if (res.meta.status !== 200) {
        return this.$message.error("删除权限失败");
      }
      // 更新数据
      row.children = res.data;
    },
    // 展示分配权限的对话框
    async showSetRightDialog(role) {
      this.roleId = role.id;
      // 获取所有权限的数据
      const { data: res } = await getAllRights("tree");
      if (res.meta.status !== 200) {
        return this.$message.error("获取权限失败");
      }
      this.rightsList = res.data;
      // 拿到所有三级权限的id
      this.getLeafKeys(role, this.defKeys);
      this.setRightDialogVisible = true;
    },
    // 获取三级权限的id
    getLeafKeys(node, arr) {
      if (!node.children) {
        return arr.push(node.id);
      }
      node.children.forEach((item) => {
        this.getLeafKeys(item, arr);
      });
    },
    // 监听分配权限对话框的关闭
    setRightDialogClosed() {
      this.defKeys = [];
    },
    // 点击为角色分配权限
    async allotRights() {
      // 半选和全选状态下的id
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys(),
      ];
      const keysStr = keys.join(",");
      const { data: res } = await postRoleRightsInfo(this.roleId, keysStr);
      if (res.meta.status !== 200) {
        return this.$message.error("分配权限失败");
      }
      this.getRoleList();
      this.$message.success("分配权限成功");
      this.setRightDialogVisible = false;
    },
  },
};
</script>

<style lang="less" scoped>
.el-breadcrumb,
.add-role {
  margin-bottom: 20px;
}
.el-tag {
  margin: 7px;
}
.bdtop {
  border-top: 1px solid #eee;
}
.bdbottom {
  border-bottom: 1px solid #eee;
}
.vcenter {
  display: flex;
  align-items: center;
}
</style>