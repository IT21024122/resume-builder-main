import { IEducation } from '@/stores/index.interface';
import { SectionHeading } from '../atoms/SectionHeading';
import { SectionSubtitle } from '../atoms/SectionSubtitle';
import { SectionTitle } from '../atoms/SectionTitle';
import { dateParser } from '@/helpers/utils';
import { useRef } from 'react';
import { useEducations } from '../../../stores/education';
import { scrollToElement } from '../../../helpers/utils/index';

export const EducationSection = ({ education }: { education: IEducation[] }) => {
  const educationRef = useRef<null | HTMLDivElement>(null);
  useEducations.subscribe(() => {
    scrollToElement(educationRef);
  });

  return (
    <div className="mb-3" ref={educationRef}>
      <SectionHeading title="Education" />

      {education.map((item: IEducation, index: number) => {
        return (
          <div key={index} className="py-2">
            <div>
              <SectionTitle label={`${item.studyType} - ${item.area}`} textSize="md" />
              <div className="">
                <SectionSubtitle label={item.institution} />
                <div className="flex gap-3">
                  <p className="text-xs">
                    {`${dateParser(item.startDate)} - ${
                      item.isStudyingHere ? 'present' : dateParser(item.endDate)
                    }`}
                  </p>
                </div>
                {item.results && item.results.length > 0 && (
                  <ul className="text-xs mt-2 list-disc pl-5">
                    {item.results.map((r, i) => (
                      <li key={i}>
                        {r.subject} - {r.grade}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
