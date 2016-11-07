程序这里不写了，就是一个RecyclerView，然后里面的条目只有一个ImageView。大概画个十几个。如图。

![界面](http://upload-images.jianshu.io/upload_images/2188564-7dd3b0793a90b510.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

代码是

    public void onBindViewHolder(final ViewHolder holder, int position) {
         Glide.with(context).load(list.get(position)) .into(holder.image);
    ｝

但是会遇到一个问题，就是上下滑动的时候会出现闪烁的情况，断开网络还会出现错位的情况。

在网上查解决方案的时候说通过setTag的方式来解决。也就是：
holder.image.setTag(list.get(position));

当tag一致的时候就不绘制，不一样的时候就绘制
结果报错了

![Paste_Image.png](http://upload-images.jianshu.io/upload_images/2188564-310b766a1c83c90b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

这个可以通过在外面再加一层Layout解决

还有一种解决方案就是设置.placeholder()，设置一个占位符，设置后没有出现过闪烁和错位的情况。
