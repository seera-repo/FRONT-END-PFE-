import './feature.css';
type Props = {
    image: string;
    title: string;
    text: string;
}
function Feature({ image, title, text }: Props) {
    return (
        <div id='feature'>
            <img id="feautreImage" src={image}></img>
            <h2 id="featureTitle" >{title}</h2>
            <p id="featureText">{text}</p>
        </div>
    );
}
export default Feature;