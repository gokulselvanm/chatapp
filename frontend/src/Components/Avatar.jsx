export default function Avatar({initials}){
    return(
        <div className="avatar avatar-placeholder cursor-pointer">
            <div className="bg-neutral text-neutral-content w-11 rounded-full">
                <span>{initials}</span>{/*their initials*/}
            </div>
        </div>
    );
}
