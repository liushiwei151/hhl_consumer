// vue.config.js
const Version = process.env.npm_package_version;
module.exports = {
  publicPath: './',
  // ���·��
  outputDir: 'dist',
  configureWebpack: {
    output: { // ����ع�  ��������� �ļ�����  ��ģ������.�汾��.js��
      filename: `js/[name].${Version}.js`,
      chunkFilename: `js/[name].${Version}.js`
    }
  },
  // ��̬��Դ·��
  assetsDir: 'assets',
  // �����Ƿ��ڿ���������ÿ�α������ʱ������eslint
  lintOnSave: true,
  productionSourceMap: true, // ����Ҫ���������� source map ����false����Сdist�ļ���С�����ٹ�����
  devServer: {
    open: false, // npm run serve���Զ���ҳ��
    host: '0.0.0.0', // ƥ�䱾��IP��ַ(Ĭ����0.0.0.0)
    port: 8080 // �������������ж˿ں�
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = '黄鹤雅集';
        return args;
      });
  }
};
