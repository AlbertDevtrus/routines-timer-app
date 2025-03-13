interface Props {
    name: any;
    color?: string;
    width?: number;
    height?: number;
    style?: any;
}


const SvgIcon = (props: Props) => {
    const { style, width = 24, height = 24, color } = props;
    const propsObj = {
        style,
        width,
        height,
        fill: color,
    };
    return <props.name {...propsObj} />;
};
export default SvgIcon;